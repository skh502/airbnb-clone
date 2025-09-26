const apiService = {
  get: async function (url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          // console.log("get response", json);
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  post: async function (url: string, data: any): Promise<any> {
    // console.log("post", url, data);
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          // console.log("post response", json);
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  postWithoutToken: async function (url: string, data: any): Promise<any> {
    // console.log("post", url, data);
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response post without token:", json);
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // postWithoutToken: async function (url: string, data: any): Promise<any> {
  //   // console.log("post", url, data);
  //   return new Promise((resolve, reject) => {
  //     fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
  //       method: "POST",
  //       body: data,
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((json) => {
  //         console.log("post without token response:", json);
  //         resolve(json);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },
};

export default apiService;
