import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import Swal from "sweetalert2";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";


function Login() {
    const [Email, SetEmail] = useState('')
    const [Password, SetPassword] = useState('')
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    const [GoHome, SetGoHome] = useState(false);
    useEffect(() => {
        if (user) {

            SetGoHome(true)
        }
    }, [user, loading])

    const onSubmit = () => {

        Swal.fire({
            title: 'Logging in...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            // didOpen: () => {
            //     Swal.showLoading()
            // }
        });

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(Email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showConfirmButton: true,
                didOpen: () => {
                    Swal.hideLoading()
                }
            });
            return;
        }
        if (Password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Password must be at least 6 characters',
                text: 'Please enter password',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showConfirmButton: true,
                didOpen: () => {
                    Swal.hideLoading()
                }
            });
            return;
        }
        signInWithEmailAndPassword(auth, Email, Password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                SetGoHome(true)
                // ...
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    text: error.message,
                    didOpen: () => {
                        Swal.hideLoading()
                    }
                });
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const ForgotPassword = () => {

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(Email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address',
            });

            return;
        }
        sendPasswordResetEmail(auth, Email)
            .then(() => {
                // Password reset email sent!
                // ..
                Swal.fire({
                    icon: 'success',
                    title: 'Password reset email sent',
                    text: 'Please check your email',
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                });
            });
    }

    useEffect(() => {
        if(GoHome){
            window.location.replace("/")
        }
    }, [GoHome])
     

    if(loading){
        return <div>Loading...</div>
    }
    return (
        <CoverLayout
            title="Welcome back"
            description="Enter your email and password to sign in"
            image={curved9}
        >
            <SoftBox component="form" role="form">
                <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Email
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput type="email" placeholder="Email" value={Email} onChange={(e) => SetEmail(e.target.value)} />
                </SoftBox>
                <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Password
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput type="password" placeholder="Password" value={Password} onChange={(e) => SetPassword(e.target.value)} />
                </SoftBox>

                <SoftBox mt={4} mb={1}>
                    <SoftButton variant="gradient" color="info" fullWidth onClick={onSubmit}>
                        log in
                    </SoftButton>
                </SoftBox>

                <SoftBox mt={4} mb={1}>
                    <SoftButton variant="gradient" color="dark" fullWidth onClick={ForgotPassword}>
                        Forgot Password?
                    </SoftButton>
                </SoftBox>

            </SoftBox>
        </CoverLayout>
    );
}

export default Login;
