export default {
    formatTime: (time) => {
        const date = new Date(time);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${hours}:${minutes}:${seconds}`;
    },
    formatDate: (time) => {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDay();
        return `${year}-${month}-${day}`;
    },
    formatDateTime: (time) => {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDay();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
};