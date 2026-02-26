import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { isValidEmailOrPhone } from "@/shared/utils/validation";
import { CyberButton } from "@/shared/components/ui/CyberButton";
import { CyberInput } from "@/shared/components/ui/CyberInput";
import { PageMask } from "@/shared/components/ui/PageMask";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // --- Client-side validation ---
    if (!isValidEmailOrPhone(emailOrPhone)) {
      setClientError("Please enter a valid email address or phone number.");
      return;
    }
    setClientError(null);

    // --- API call ---
    try {
      await login({ email_or_phone_number: emailOrPhone, password });
      navigate("/");
    } catch {
      // API error is captured inside useAuth and exposed as `error`
    }
  };

  return (
    <div className="flex flex-col relative min-h-screen w-full bg-black text-white">
      <PageMask />

      <div className="flex flex-col items-center justify-center p-8 flex-grow pt-46">
        <h1 className="mb-8 font-black italic tracking-widest text-2xl text-[#ea8cff]">
          LOGIN
        </h1>
        {/* Dark card — bg-black required so CyberInput floating labels mask correctly */}
        <div className="w-full max-w-lg rounded-xl  bg-black p-8">
          {/* <h1 className="mb-8 font-black italic tracking-widest text-2xl text-[#ea8cff]">
            SIGN IN
          </h1> */}

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* API / server error alert */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-500/50 bg-red-900/20 px-4 py-3"
              >
                <p className="text-sm font-bold text-red-400">{error}</p>
              </div>
            )}

            {/* Email Address — clientError drives border + inline message */}
            <CyberInput
              id="email_or_phone_number"
              label="Email or Phone Number"
              type="text"
              value={emailOrPhone}
              onChange={(e) => {
                setEmailOrPhone(
                  (e as React.ChangeEvent<HTMLInputElement>).target.value,
                );
                if (clientError) setClientError(null); // clear on retype
              }}
              placeholder="test@test.com or +1234567890"
              error={clientError}
              className="mt-4"
            />

            {/* Password */}
            <CyberInput
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  (e as React.ChangeEvent<HTMLInputElement>).target.value,
                )
              }
              placeholder="••••••••"
              required
              className="mt-2"
            />

            {/* Submit — type, disabled, loading text all preserved */}
            <div className="flex justify-center">
              <CyberButton
                type="submit"
                disabled={isLoading}
                className="mt-4 w-[50%] py-5"
              >
                {isLoading ? "Signing in…" : "Submit"}
              </CyberButton>
            </div>
          </form>
        </div>
        {/* /card */}
      </div>
      <svg
        width="1900"
        height="300"
        viewBox="0 0 1502 241"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className=""
        preserveAspectRatio="xMidYMax meet"
      >
        <path
          d="M1501.78 36.5488V30.815V0H1465.8V31.3525H1473V78.3822H1465.8V87.5194H1501.78V36.5488Z"
          fill="#ED79F6"
        />
        <path
          d="M492.596 177.875L438.954 212.6H410.107V217.588H383.123V212.6H347.624L376.501 231.294H594.644L554.159 205.089V177.875H492.596ZM516.983 210.99V212.603H490.647V195.554H516.983V210.99Z"
          fill="#ED79F6"
        />
        <path
          d="M1121.87 187.76L1170.85 156.049H1205.93V127.472H1099.56L1032.17 171.098H846.466L819.621 153.72H771.618L799.094 171.507V187.762H879.63V182.925H1070.18V187.762H1121.87V187.76ZM1107.68 140.597C1115.7 140.597 1122.2 144.809 1122.21 150.003C1122.2 155.197 1115.7 159.407 1107.68 159.409C1099.65 159.407 1093.15 155.197 1093.15 150.003C1093.15 144.809 1099.65 140.597 1107.68 140.597Z"
          fill="#ED79F6"
        />
        <path
          d="M340.578 212.603H277.291L0 33.0962V45.4174L287.135 231.296H369.455L340.578 212.603Z"
          fill="#ED79F6"
        />
        <path
          d="M1307.21 166.932H1181.84V171.427H1307.21V166.932Z"
          fill="#ED79F6"
        />
        <path
          d="M649.643 209.378V187.76H794.11V172.842L764.572 153.72H473.674L412.234 193.494H274.963L23.666 30.8151H3.52356L279.357 209.378H383.125V204.078H410.109V209.378H436.893L490.536 174.652H616.432V209.378H649.643ZM768.787 165.319V180.762L748.126 173.04L768.787 165.319ZM738.346 165.319V180.762L717.685 173.04L738.346 165.319ZM707.901 165.319V180.762L687.244 173.04L707.901 165.319ZM677.457 165.319V180.762L656.796 173.04L677.457 165.319ZM621.277 195.285H630.825V189.104H636.637V195.285H646.185V199.047H636.637V205.228H630.825V199.047H621.277V195.285Z"
          fill="#ED79F6"
        />
        <path
          d="M1457.94 143.76L1501.78 115.378V90.7444H1427.4L1362.22 132.937L1426.78 174.729V185.879H1430.51V210.99H1426.78V219.472H1243.29V240.074H1502V219.149L1457.94 190.626V143.76ZM1397.79 230.447H1271.45C1268.12 230.447 1265.43 228.703 1265.43 226.549C1265.43 224.397 1268.12 222.651 1271.45 222.651H1397.79C1401.11 222.651 1403.81 224.397 1403.81 226.549C1403.81 228.701 1401.11 230.447 1397.79 230.447ZM1473 213.248C1481.02 213.25 1487.52 217.457 1487.53 222.654C1487.52 227.848 1481.02 232.057 1473 232.059C1464.97 232.057 1458.47 227.848 1458.47 222.654C1458.47 217.457 1464.97 213.25 1473 213.248Z"
          fill="#ED79F6"
        />
        <path
          d="M1107.68 156.184C1112.95 156.178 1117.22 153.417 1117.23 150.003C1117.22 146.589 1112.95 143.828 1107.68 143.822C1102.41 143.828 1098.14 146.589 1098.13 150.003C1098.14 153.415 1102.41 156.178 1107.68 156.184ZM1107.68 145.209C1111.77 145.209 1115.08 147.354 1115.08 150.001C1115.08 152.647 1111.77 154.795 1107.68 154.795C1103.59 154.795 1100.27 152.65 1100.27 150.001C1100.27 147.354 1103.59 145.209 1107.68 145.209Z"
          fill="#ED79F6"
        />
        <path
          d="M1460.82 31.3525V0H1451.18L1422.4 18.6335V30.8171H1343.25V83.8044H1295.58L1228.11 127.476H1210.91V156.053H1319.47L1425.33 87.5237H1460.82V78.3865H1453.76V31.3568H1460.82V31.3525ZM1309.71 113.856H1300.16V120.037H1294.35V113.856H1284.8V110.094H1294.35V103.913H1300.16V110.094H1309.71V113.856ZM1417.65 43.3555H1352.88V36.3231H1417.65V43.3555Z"
          fill="#ED79F6"
        />
        <path
          d="M1473 228.835C1478.27 228.828 1482.53 226.065 1482.54 222.653C1482.53 219.239 1478.27 216.479 1473 216.472C1467.73 216.479 1463.46 219.239 1463.45 222.653C1463.46 226.063 1467.73 228.828 1473 228.835ZM1473 217.859C1477.08 217.859 1480.4 220.005 1480.4 222.651C1480.4 225.296 1477.08 227.444 1473 227.444C1468.91 227.444 1465.59 225.298 1465.59 222.651C1465.59 220.005 1468.91 217.859 1473 217.859Z"
          fill="#ED79F6"
        />
        <path
          d="M1238.3 216.247H1421.79V210.99H1417.64V185.879H1421.79V176.067L1358.69 135.218L1321.53 159.274H1172.91L1123.93 190.985H1070.17V195.285H879.624V190.985H654.62V212.603H611.446V177.877H559.138V203.756L601.685 231.299H696.459L735.482 206.037H1121.28L1173.87 240.077H1238.3V216.247ZM1176.86 163.707H1312.2V173.04V174.652H1176.86V163.707Z"
          fill="#ED79F6"
        />
        <path
          d="M511.998 198.779H495.625V209.378H511.998V198.779Z"
          fill="#ED79F6"
        />
        <path
          d="M30.5361 21.8564L134.041 88.8633L150.926 77.9352L205.445 113.228V124.337L297.539 183.953H398.819L442.863 155.44V141.178H414.123V157.616L386.159 175.718H319.471V139.387L270.528 107.705H243.086V90.2973L166.977 41.0273L144.284 55.7178L95.2975 24.0063L30.5361 21.8564Z"
          fill="#3A3A3A"
        />
        <path
          d="M3.4749 180.113V186.219L85.7418 239.477L95.2235 239.507L3.4749 180.113Z"
          fill="#3A3A3A"
        />
        <path
          d="M69.6178 239.425L79.0962 239.455L3.4749 190.501V196.607L69.6178 239.425Z"
          fill="#3A3A3A"
        />
        <path
          d="M27.0924 150.003L11.3837 160.172L134.125 239.629L274.355 240.074L162.799 167.858H133.208L80.5986 133.801V114.125L3.35326 64.1196V94.238L27.0924 109.606V150.003Z"
          fill="#3A3A3A"
        />
        <path
          d="M3.4749 200.89V205.228L56.2338 239.382L62.9723 239.403L3.4749 200.89Z"
          fill="#3A3A3A"
        />
        <path
          d="M8.07462 162.313L3.4749 165.289V165.442L117.996 239.578L127.475 239.608L8.07462 162.313Z"
          fill="#3A3A3A"
        />
        <path
          d="M3.4749 169.724V175.83L101.869 239.526L111.351 239.556L3.4749 169.724Z"
          fill="#3A3A3A"
        />
      </svg>
    </div>
  );
};

export default LoginPage;
