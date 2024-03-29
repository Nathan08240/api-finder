import { FormControl, InputAdornment, Modal, TextField } from "@mui/material";
import { ButtonSubmit, Form, LoginBox, LoginWrapper } from "./style";
import { AccountCircle, Lock, Mail } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../App";
import { useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

type Inputs = {
  email: string;
  password: string;
};

interface User {
  _id: string;
  lastname: string;
  firstname: string;
  email: string;
  role: string;
  promotion: string;
}

interface Promotion {
  _id: string;
  name: string;
  reference: string;
}

export const Login = () => {
  const { promotion, setUser, setToken, setLocation, setPromotion  } = useContext(
    AuthContext
  ) as any;
  // const [userData, setUserData] = useState<User[]>([]);
  const [promotionData, setPromotionData] = useState<Promotion[]>([]);
  const { register, handleSubmit } = useForm<Inputs>();

  // @ts-ignore
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/auth/login`;
  //@ts-ignore
  const apiUsersUrl = `${import.meta.env.VITE_API_URL}/api/users`;
  //@ts-ignore
  const apiPromotionsUrl = `${import.meta.env.VITE_API_URL}/api/promotions`;
  const url = new URL(apiUrl);
  const urlUsers = new URL(apiUsersUrl);
  const urlPromotions = new URL(apiPromotionsUrl);

  useEffect(() => {
    // fetch(urlUsers, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((data) => {
    //     return data.json();
    //   })
    //   .then((resp) => {
    //     setUserData(resp);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    fetch(urlPromotions, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((resp) => {
        setPromotionData(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      const token = res.token;
      const user: any = jwtDecode(token);
      setUser(user);
      console.log(user)
      setToken(token);
      const promotionMap = user.promotion.map((promotionMap: string) =>
        promotionData.find(promo => promo._id === promotionMap)?.name
        );
      setPromotion(promotionMap);

      if (user?.role === "student") {
        setLocation(
          `/BDD/${promotion[0]}/${user.lastname}_${user.firstname}`
        );
      } else {
        setLocation("/BDD");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Consumer key="lol">
      {({}) => (
        <Modal open={true}>
          <LoginWrapper>
            <LoginBox>
              <AccountCircle
                sx={{
                  fontSize: 75,
                  color: "primary.main",
                  margin: "40px auto 0",
                }}
              />
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormControl
                  sx={{
                    mt: 2,
                    mb: 4,
                    gap: 6,
                    width: "100%",
                  }}
                >
                  <TextField
                    required
                    id="email"
                    label="Email"
                    type="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail />
                        </InputAdornment>
                      ),
                    }}
                    {...register("email", { required: true })}
                  />

                  <TextField
                    required
                    id="password"
                    label="Mot de passe"
                    type="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                    {...register("password", { required: true })}
                  />
                </FormControl>
                <ButtonSubmit type="submit" variant="contained">
                  Se connecter
                </ButtonSubmit>
              </Form>
            </LoginBox>
          </LoginWrapper>
        </Modal>
      )}
    </AuthContext.Consumer>
  );
};
