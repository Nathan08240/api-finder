import styled from "styled-components";

export const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;

  .login-form-button {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: #1890ff;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 400px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }

  .login-form-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
    padding: 20px;

  }
`;
