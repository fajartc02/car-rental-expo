import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { Row, Col } from "@/components/Grid";

// import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import {
  ProgressSteps,
  ProgressStep,
} from "@ouedraogof/react-native-progress-steps";
import PAYMENT_STEPS from "@/constants/PaymentStepsConstant";
import PAYMENT_METHODS from "@/constants/PaymentMethods";

import { selectDetailCar } from "@/redux/reducers/car/carDetailsSlice";

import FooterPayment1 from "@/components/FooterPayment1";
import FooterPayment2 from "@/components/FooterPayment2";

import Constants from "expo-constants";
import { router } from "expo-router";
import PaymentHeader from "@/components/PaymentHeader";
import Step1Screen from "@/components/PaymentDetails/Step1Screen";
import Step2Screen from "@/components/PaymentDetails/Step2Screen";
import { TouchableOpacity } from "react-native";
import CountdownPayment from "@/components/PaymentDetails/CountdownPayment";
import ImagePickerExample from "@/components/ImgPicker";
import Step3Screen from "@/components/PaymentDetails/Step3Screen";
import FooterPayment3 from "@/components/FooterPayment3";
import { useSelector, useDispatch } from "react-redux";
import {
  POST_ORDER,
  selectOrder,
  PUT_ORDER_SLIP,
  resetState,
} from "@/redux/reducers/order/orderSlice";
import { selectLogin } from "@/redux/reducers/auth/loginSlice";
import LoadingIndicator from "@/components/LoadingIndicator";

import moment from "moment";

export default function payment() {
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get("window").height;
  const { data, isLoading, isError, errorMassage } =
    useSelector(selectDetailCar);
  const userSlice = useSelector(selectLogin);
  const orderSlice = useSelector(selectOrder);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentIdSelected, setPaymentIdSelected] = useState(0);
  const [imgSlip, setImgSlip] = useState(null);

  let PaymentSteps = PAYMENT_STEPS;
  let PaymentMethods = PAYMENT_METHODS;
  function nextStep() {
    setActiveStep(activeStep + 1);
  }

  async function submitOrder() {
    const formData = {
      start_rent_at: moment().format("YYYY-MM-DD"),
      finish_rent_at: moment().add(1, "days").format("YYYY-MM-DD"),
      car_id: data.id,
    };

    await dispatch(
      POST_ORDER({ formData, token: userSlice.user.access_token })
    );

    if (orderSlice?.isError) return alert(orderSlice?.errorMassage);
    if (orderSlice.isLoading) return <LoadingIndicator />;
    nextStep();
  }

  function prevStep() {
    setActiveStep(activeStep - 1);

    if (activeStep <= 0) {
      dispatch(resetState());
      router.back();
    }
    return true;
  }

  async function onUploadSlip() {
    const payload = {
      token: userSlice?.user?.access_token,
      id: orderSlice?.data?.id,
      formData: imgSlip,
    };
    await dispatch(PUT_ORDER_SLIP(payload));
    if (orderSlice?.isError) return alert(orderSlice?.errorMassage);
    if (orderSlice.isLoading) return <LoadingIndicator />;

    setTimeout(() => {
      nextStep();
      closeModalBounce();
    }, 1000);
  }

  function closeModalBounce() {
    opacity.setValue(0);
  }

  let opacity = new Animated.Value(0);

  const animate = (easing) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      easing,
      useNativeDriver: false,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowHeight],
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
      height: size,
      zIndex: 2,
    },
  ];

  function handleChangeHeader() {
    if (activeStep == 0) {
      return <ThemedText style={styles.textBold}>Pembayaran</ThemedText>;
    } else if (activeStep == 1) {
      const findPaymentSelected = PaymentMethods.find(
        (item) => item.id == paymentIdSelected
      );
      return (
        <>
          <ThemedText style={styles.textBold}>
            {findPaymentSelected.desc}
          </ThemedText>
          <ThemedText style={styles.textBold}>
            ORDER ID: {orderSlice.data.id || "xxxxxxx"}
          </ThemedText>
        </>
      );
    } else if (activeStep == 2) {
      return (
        <>
          <ThemedText style={styles.textBold}>Tiket</ThemedText>
          <ThemedText style={styles.textBold}>
            ORDER ID: {orderSlice.data.id || "xxxxxxx"}
          </ThemedText>
        </>
      );
    }
  }

  function handleChangeStepScreen() {
    switch (activeStep) {
      case 0:
        return (
          <Step1Screen
            data={data}
            paymentIdSelected={paymentIdSelected}
            onChangePaymentId={(id) => setPaymentIdSelected(id)}
          />
        );
      case 1:
        const findPaymentSelected = PaymentMethods.find(
          (item) => item.id == paymentIdSelected
        );
        return (
          <Step2Screen
            data={data}
            paymentMethodSelected={findPaymentSelected}
            paymentIdSelected={paymentIdSelected}
          />
        );
      case 2:
        return (
          <Step3Screen
            data={data}
            paymentMethodSelected={findPaymentSelected}
            paymentIdSelected={paymentIdSelected}
            dataSlip={orderSlice.dataSlip}
          />
        );
      default:
        return (
          <ThemedView>
            <ThemedText>No step found!</ThemedText>
          </ThemedView>
        );
    }
  }

  return (
    <ThemedView style={styles.container}>
      {orderSlice.isLoading && <LoadingIndicator />}
      {orderSlice.errorMassage && (
        <ThemedText>{JSON.stringify(orderSlice.errorMassage)}</ThemedText>
      )}
      <PaymentHeader prevStep={prevStep}>{handleChangeHeader()}</PaymentHeader>
      <ProgressSteps activeStep={activeStep}>
        {PaymentSteps.map((item, index) => {
          return (
            <ProgressStep key={index} label={item.label} removeBtnRow={true}>
              {isLoading || orderSlice.isLoading ? (
                <LoadingIndicator />
              ) : (
                handleChangeStepScreen()
              )}
            </ProgressStep>
          );
        })}
      </ProgressSteps>
      {activeStep == 0 ? (
        <FooterPayment1
          data={data}
          paymentIdSelected={paymentIdSelected}
          onChangeStep={() => submitOrder()}
        />
      ) : activeStep == 1 ? (
        <>
          {/* Modal Payment confirmation */}
          <Animated.View style={animatedStyles}>
            {orderSlice.isLoading && <LoadingIndicator />}
            <ThemedView style={styles.containerModal}>
              <Row style={{ alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity
                  style={{
                    width: "20%",
                    height: 6,
                    borderRadius: 8,
                    backgroundColor: "#d0d0d0",
                  }}
                  onPress={() => {
                    opacity.setValue(0);
                  }}
                ></TouchableOpacity>
              </Row>
              <Row style={{ alignItems: "center", justifyContent: "center" }}>
                <Col>
                  <ThemedText style={styles.textBold}>
                    Konfirmasi Pembayaran
                  </ThemedText>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ThemedText
                    style={{ ...styles.textBold, textAlign: "center" }}
                  >
                    Terima kasih telah melakukan konfirmasi pembayaran.
                    Pembayaranmu akan segera kami cek tunggu kurang lebih 10
                    menit untuk mendapatkan konfirmasi.
                  </ThemedText>
                </Col>
              </Row>
              <Row style={{ alignItems: "center", justifyContent: "center" }}>
                <Col>
                  <CountdownPayment
                    lastTimeDate={600}
                    timeToShow={["M", "S"]}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <ThemedText style={{ ...styles.textBold, textAlign: "left" }}>
                    Upload Bukti Pembayaran
                  </ThemedText>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ThemedText style={{ ...styles.textBold, textAlign: "left" }}>
                    Untuk membantu kami lebih cepat melakukan pengecekan. Kamu
                    bisa upload bukti bayarmu
                  </ThemedText>
                </Col>
              </Row>
              <Row>
                <Col
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 200,
                    width: "100%",
                    backgroundColor: "#EEEEEE",
                    borderStyle: "dashed",
                    borderWidth: 1,
                    borderColor: "grey",
                  }}
                >
                  <ImagePickerExample
                    onSetImgSlip={(image) => setImgSlip(image)}
                    initialImg={null}
                    title={null}
                  />
                </Col>
              </Row>
            </ThemedView>
            <ThemedView style={styles.footer}>
              <TouchableOpacity
                style={
                  imgSlip
                    ? styles.btnSuccess
                    : {
                        ...styles.btnOutlineSuccess,
                        borderColor: "grey",
                        fomtWeight: "bold",
                      }
                }
                onPress={() => {
                  onUploadSlip();
                }}
                disabled={!imgSlip}
              >
                <ThemedText
                  style={imgSlip ? styles.textLight : { color: "grey" }}
                >
                  Upload
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnOutlineSuccess}>
                <ThemedText style={styles.textSuccess}>
                  Lihat Daftar Pesanan
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </Animated.View>
          {/* </ThemedView> */}
          <FooterPayment2
            data={data}
            paymentIdSelected={paymentIdSelected}
            onShowModal={() => animate(Easing.bounce)}
          />
        </>
      ) : (
        <FooterPayment3
          data={data}
          paymentIdSelected={paymentIdSelected}
          onShowModal={() => animate(Easing.bounce)}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: 0,
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
  },
  footer: {
    alignItems: "flex-start",
    padding: 16,
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#FFF",
    gap: 8,
    zIndex: 1,
  },
  containerModal: {
    flex: 1,
    // alignItems: "center",
    // textAlign: "center",
    gap: 16,
    padding: 16,
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 16,
  },
  listPayment: {
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginBottom: 16,
    marginTop: 16,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    borderWidth: 1,
    marginVertical: 4,
    borderRadius: 4,
    shadowColor: "rgba(0,0,0,0.2)",
    // android
    elevation: 0.5,
    // ios
    shadowOpacity: 1,
    shadowRadius: 4,
    width: 80,
  },
  textBold: {
    fontWeight: "bold",
  },
  bold: {
    marginTop: 16,
  },
  textLight: {
    color: "white",
    fontWeight: "bold",
  },
  textSuccess: {
    color: "#3D7B3F",
    fontWeight: "bold",
  },
  btnSuccess: {
    backgroundColor: "#3D7B3F",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#3D7B3F",
    width: "100%",
  },
  btnOutlineSuccess: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#3D7B3F",
    width: "100%",
  },
});
