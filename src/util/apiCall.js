import { Auth } from "aws-amplify";
export const signUp = async (email, username, pwd) => {
    console.log(email, username, pwd);

    try {
        const { user } = await Auth.signUp({
            username: email,
            password: pwd,
            attributes: {
                email: email,
                preferred_username :username
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
        throw error;
    }
}

export const signOut = async () => {
    console.log("Inside signout")
    try {
        await Auth.signOut({ global: true });
    } catch (error) {
        console.log('error signing out: ', error);
        throw error
    }
}