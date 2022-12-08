import { Auth } from "aws-amplify";
export const signUp = async (email, uName, pwd) => {
    console.log(email, uName, pwd);

    try {
        const { user } = await Auth.signUp({
            username: email,
            password: pwd,
            attributes: {
                email: email
            },
            autoSignIn: {
                enabled: true
            }
        });
        
        console.log(user)
        return user;
    } catch (error) {
        console.log(error)
    }
}


export const confirmSignUp = async (username, code) => {
    try {
      const res = await Auth.confirmSignUp(username, code);
      console.log(res);
      return res
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

export const resendConfirmationCode = async(username) =>{
    try {
        await Auth.resendSignUp(username);
        console.log('code resent successfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }
}

export const signIn = async (username, password) => {
    try {
        const user = await Auth.signIn(username, password);
        return user;
    } catch (error) {
        console.log('error signing in', error);
    }
}