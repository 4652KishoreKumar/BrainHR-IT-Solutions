
const mockWebSocket = {
    addEventListener: (_, callback) => {
      setInterval(() => {
        const newData = [...Array(10)].map(() => Math.floor(Math.random() * 100));
        callback({ data: JSON.stringify(newData) });
      }, 2000); // Simulate data every 2 seconds
    },
    removeEventListener: () => {}
  };
  
  export default mockWebSocket;
  