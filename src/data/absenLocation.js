export const absenLocationCoordinate = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                latitude: -7.4065326029647345,
                longitude: 109.24766438737775,
            });
        }, 5000); //-7.4065326029647345, 109.24766438737775
    });
};
