import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import API from '../API';
//
import Loading from '../components/Loading';
import Warning from '../Warning';
import Join from './Join';
import Password from './Password';

const Login = (props) => {
  window.scrollTo(0, 0);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailChecked, setEmailChecked] = useState(false); //이메일 체크 했는지 안했는지
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    //이메일 체크
    setEmail(data.email);
    setEmailChecked(true);
    setLoading(true);

    var formdata = new FormData();
    formdata.append('email', data.email);

    var requestOptions = {
      method: 'POST',
      body: formdata,
    };

    API.checkInfo('email', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.email_exist === true) {
          setShowPasswordInput(true);
        }
        setLoading(false);
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <>
      {loading && <Loading />}
      {loading || emailChecked ? (
        showPasswordInput ? (
          loading || <Password email={email} />
        ) : (
          loading || <Join email={email} />
        ) //email check가 false, 입력한 email 존재
      ) : (
        <section className="flex h-screen items-center pt-10">
          <div className="bg-white w-full h-screen px-6 flex items-center justify-center">
            <div className="w-full h-full">
              <div className="flex justify-center flex-col">
                <span className="text-xl font-bold leading-tight mt-10">
                  로그인 · 회원가입을 진행해주세요.
                </span>
              </div>
              <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-gray-darkest">이메일</label>
                  <input
                    name="email"
                    {...register('email', {
                      required: true,
                      pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    })}
                    placeholder="이메일을 입력해 주세요."
                    className="w-full px-4 py-3 rounded-lg mt-2 border border-gray-border focus:border-primary focus:bg-white focus:outline-none"
                    autoFocus
                  />
                  {errors.email && errors.email.type === 'required' && (
                    <Warning>이메일을 입력해주세요.</Warning>
                  )}
                  {errors.email && errors.email.type === 'pattern' && (
                    <Warning>이메일 형식에 맞지 않습니다.</Warning>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-primary bg-opacity-90 hover:bg-opacity-80 focus:bg-opacity-100 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      fillRule="evenodd"
                      stroke="#FFF"
                      strokeWidth="2"
                    >
                      <rect
                        width="17.2"
                        height="14"
                        x="3.4"
                        y="5"
                        rx="3"
                      ></rect>
                      <path d="M3.2 5.6L12 12l8.8-6.4"></path>
                    </g>
                  </svg>{' '}
                  <span className="ml-2">이메일로 시작하기</span>
                </button>
              </form>
              <hr className="my-6 border-gray-border w-full" />
              <button
                type="button"
                className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 font-semibold rounded-lg px-4 py-3 border border-gray-border"
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path
                        fill="#EA4335"
                        d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                      ></path>
                      <path
                        fill="#4285F4"
                        d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                      ></path>
                      <path d="M0 0h18v18H0z"></path>
                    </g>
                  </svg>
                  <span className="ml-3 text-gray-social">
                    <span className="font-bold">Google</span>로 시작하기
                  </span>
                </div>
              </button>
              <button
                type="button"
                className="w-full mt-3 block bg-white hover:bg-gray-100 focus:bg-gray-100 font-semibold rounded-lg px-4 py-3 border border-gray-border"
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path
                      fill="#1877f2"
                      fillRule="evenodd"
                      d="M18 9a9 9 0 1 0-10.406 8.89v-6.288H5.309V9h2.285V7.017c0-2.255 1.343-3.501 3.4-3.501.984 0 2.014.175 2.014.175v2.215h-1.135c-1.118 0-1.467.694-1.467 1.406V9h2.496l-.399 2.602h-2.097v6.289C14.71 17.215 18 13.492 18 9"
                    ></path>
                  </svg>
                  <span className="ml-3 text-gray-social">
                    <span className="font-bold">Facebook</span>로 시작하기
                  </span>
                </div>
              </button>
              <p className="mt-5 text-center text-sm text-gray">
                걱정마세요! 여러분의 활동은 SNS에 노출되지 않습니다.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
