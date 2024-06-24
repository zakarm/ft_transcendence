import styles from "@/app/settings/styles.module.css";
import { ChangeEvent, useContext } from "react";
import { FormContext, SettingsProps } from "../form-components/formContext";
import { GetInput, GetCheckboxInput, Props } from "../form-components/input";

function GenerateInputFields() {
  const { oldAccountValues } = useContext<SettingsProps>(FormContext);

  const inputProps = [
    {
      inputId: "new_password",
      labelText: "New Password",
      inputLength: 200,
    },
    {
      inputId: "repeat_password",
      labelText: "Repeat Password",
      inputLength: 200,
    },
    {
      inputType: "checkbox",
      inputId: "is_2fa_enabled",
      labelText: "Enable 2FA",
      placeholder: oldAccountValues["is_2fa_enabled"],
    }
  ];

  return (
    <>
      {inputProps
        .slice(0, 2)
        .map(
          ({
            className,
            inputType,
            inputId,
            labelText,
            placeholder,
            inputLength,
          }: Props) => {
            return (
              <div key={inputId}>
                <GetInput
                  className="p-0 m-0 mt-4 row justify-content-center itim-font"
                  inputType="text"
                  inputId={inputId}
                  labelText={labelText}
                  placeholder={placeholder}
                  inputLength={inputLength}
                ></GetInput>
              </div>
            );
          }
        )}
      <div key={inputProps[2].inputId}>
        <GetCheckboxInput
          className="p-0 m-0 mt-4 row justify-content-center itim-font"
          inputType={inputProps[2].inputType}
          inputId={inputProps[2].inputId}
          labelText={inputProps[2].labelText}
          placeholder={inputProps[2].placeholder}
          inputLength={inputProps[2].inputLength}
        ></GetCheckboxInput>
      </div>
    </>
  );
}

function SecurityTab() {
  const { currentAccoutValues } = useContext<SettingsProps>(FormContext);

  return (
    <>
      <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center h-100">
        <div
          className={`${
            Boolean(currentAccoutValues["is_2fa_enabled"]) ? "" : styles.qr_image
          } my-3`}
        >
          <img src="qr_code.png" alt="" className={`${styles.qr_code}`} />
        </div>
      </fieldset>
      <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center">
        <div className="row ">
          <GenerateInputFields />
        </div>
      </fieldset>
    </>
  );
}

export default SecurityTab;
