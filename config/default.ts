require("dotenv").config();

const dbUser = process.env.DB_USER
const dbPassWord = process.env.DB_PASS
//${dbPassWord}${dbUser}

export default {
    port:3000,
    dbUrl:
     `mongodb+srv://${dbUser}:${dbPassWord}@cluster0.s1if5.mongodb.net/`,
     env:"development",
};


