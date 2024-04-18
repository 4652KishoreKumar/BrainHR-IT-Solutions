import { API_URL } from "../Constants";

class ApiService {
  static async submitForm(formData) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  }
}

export default ApiService;
