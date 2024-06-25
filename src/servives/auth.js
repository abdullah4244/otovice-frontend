import axios from "axios";

export const signUp = async (payload) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/signup`,
    {
      ...payload,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const login = async (payload) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/login`,
    {
      ...payload,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const forgotpassword = async (payload) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/forgot-password`,
    {
      ...payload,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const resetPassword = async (payload) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/reset-password/${payload.id}`,
    {
      password: payload.password
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const googleAuthenticator = async (tokenId) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/google`,
    {
      ...tokenId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const updateUser = async (tokenId, userId) => {
  return await axios.patch(
    `${process.env.REACT_APP_API_URL}/auth/updateUser/${userId}`,
    {
      ...tokenId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const verifyUser = async (payload) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/verify/${payload}`,
  );
};

export const getProfile = async (userId) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/auth/me/${userId}`);
};
