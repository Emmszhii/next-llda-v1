import { useField } from "formik";
import { FaCheck } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { NumericFormat } from "react-number-format";

export const InputTextArea = ({
  label,
  required = true,
  className = "",
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name} className="z-9">
        {required && <span className="text-alert">*</span>}
        {label}
      </label>
      <textarea
        className={
          meta.touched && meta.error ? `error-show ${className}` : className
        }
        {...field}
        {...props}
        autoComplete="off"
      ></textarea>
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputText = ({
  label = "",
  required = true,
  className = "",
  onChange = null,
  refVal = null,
  ...props
}) => {
  const [field, meta] = useField(props);

  if (props.number === "number") {
    return (
      <>
        {label !== "" && typeof label !== "undefined" && (
          <label htmlFor={props.id || props.name}>
            {required && <span className="text-alert">*</span>}
            {label}
          </label>
        )}
        <NumericFormat
          {...field}
          {...props}
          allowLeadingZeros
          autoComplete="off"
          className={`${
            meta.touched && meta.error ? "error-show" : null
          }  ${className}`}
          onChange={(e) => {
            onChange !== null && onChange(e);
            field.onChange(e);
          }}
        />

        {meta.touched && meta.error ? (
          <span className={`error-show`}>{meta.error}</span>
        ) : null}
      </>
    );
  }

  return (
    <>
      <input
        {...field}
        {...props}
        className={
          meta.touched && meta.error ? `error-show ${className}` : className
        }
        autoComplete="off"
        onChange={(e) => {
          onChange !== null && onChange(e);
          field.onChange(e);
        }}
        ref={refVal}
      />
      {label !== "" && typeof label !== "undefined" && (
        <label htmlFor={props.id || props.name}>
          {required && <span className="text-alert">*</span>}
          {label}
        </label>
      )}

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const RecaptchaRequired = ({
  label = "",
  required = true,
  className = "",
  onChange = null,
  refVal = null,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? `error-show ${className} hidden`
            : "hidden"
        }
        autoComplete="off"
        ref={refVal}
      />
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputSelect = ({
  label,
  required = true,
  onChange = null,
  className = null,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>
        {required && <span className="text-alert">*</span>}
        {label}
      </label>

      <select
        {...field}
        {...props}
        className={`${
          meta.touched && meta.error ? "error-show" : null
        } ${className}`}
        onChange={(e) => {
          onChange !== null && onChange(e);
          field.onChange(e);
        }}
        autoComplete="off"
      />

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputPhotoUpload = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <span className="error--msg">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputFileUpload = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "custom error-show" : "custom"}
      >
        {label}
      </label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <span className="error--msg">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputTextOnChange = ({ label, onChange, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "custom error-show" : "custom"}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? "error-show" : null}
        autoComplete="off"
        onChange={(e) => {
          onChange(e);
          field.onChange(e);
        }}
      />
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const MyCheckbox = ({ label, onChange = null, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input
        {...field}
        {...props}
        className={`${meta.touched && meta.error ? "error-show" : null} h-full`}
        onChange={(e) => {
          onChange !== null && onChange(e);
          field.onChange(e);
        }}
      />
      {label !== "" && typeof label !== "undefined" && (
        <label className="label" htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      {meta.touched && meta.error ? (
        <small className="msg--error">{meta.error}</small>
      ) : null}
    </>
  );
};

export const InputCheckbox = ({ label, onChange = null, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="flex items-center gap-2">
        <span
          className="relative flex cursor-pointer items-center justify-center rounded-full"
          htmlFor={props.id || props.name}
        >
          <input
            checked={field.value}
            value={field.value}
            {...field}
            {...props}
            className={`outline-none ${
              meta.touched && meta.error
                ? "w-auto h-auto error-show"
                : "p-1.5 before:content-[''] peer relative h-auto w-auto cursor-pointer border-green-600 appearance-none rounded-sm transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 before:transition-opacity checked:bg-green-600"
            }`}
            type="checkbox"
            onChange={(e) => {
              onChange !== null && onChange(e);
              field.onChange(e);
            }}
          />
          <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <FaCheck className="h-3 w-3" />
          </span>
        </span>

        <label
          htmlFor={props.id || props.name}
          className="cursor-pointer -bottom-2 m-0 -translate-y-4 left-6 normal-case!"
        >
          {label}
        </label>
      </div>
    </>
  );
};

export const InputRadioButton = ({ label, onChange = null, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="flex items-center pl-0 w-fit">
        <span className="relative flex cursor-pointer items-center rounded-full ">
          <input
            {...field}
            {...props}
            type="radio"
            className={
              meta.touched && meta.error
                ? "before:content[''] peer p-1 relative h-4 w-4 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-accent transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-accent hover:border-accent checked:before:bg-accent hover:before:bg-accent hover:before:opacity-10 error-show"
                : "before:content[''] peer p-1 relative h-4 w-4 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-accent transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-accent hover:border-accent checked:before:bg-accent hover:before:bg-accent hover:before:opacity-10"
            }
            onChange={(e) => {
              onChange !== null && onChange(e);
              field.onChange(e);
            }}
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-accent opacity-0 transition-opacity peer-checked:opacity-100 peer-hover:opacity-100">
            <FaCircleCheck className="h-3.5 w-3.5 fill-primary" />
          </div>
        </span>

        <label
          htmlFor={props.id || props.name}
          className="relative left-[unset] top-[unset] transform-none cursor-pointer after:bg-transparent ml-2"
        >
          {label}
        </label>
      </div>
    </>
  );
};

export const EvaluationRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div
        className={
          meta.touched && meta.error
            ? "flex items-center bg-red-100 first-of-type:rounded-tl-md first-of-type:rounded-tr-md last-of-type:rounded-bl-md last-of-type:rounded-br-md"
            : "flex items-center"
        }
      >
        <span className="relative flex cursor-pointer items-center rounded-full p-3 ">
          <input
            {...field}
            {...props}
            type="radio"
            className={
              meta.touched && meta.error
                ? "z-0 error-show before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-primary transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:before:bg-primary hover:before:opacity-10"
                : "z-0 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-primary transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:before:bg-primary hover:before:opacity-10"
            }
            required={meta.touched && meta.error}
          />

          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-primary opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            </svg>
          </div>
        </span>

        <label
          htmlFor={props.id || props.name}
          className={
            meta.touched && meta.error
              ? "z-0 error-show relative left-[unset] top-[unset] transform-none cursor-pointer  after:bg-transparent text-red-500"
              : "z-0 relative left-[unset] top-[unset] transform-none cursor-pointer after:bg-transparent"
          }
        >
          {props.value[1]} - {label}
        </label>
      </div>
      {/* 
      {meta.touched && meta.error ? (
        <span className="error-show ">{meta.error}</span>
      ) : null} */}
    </>
  );
};

export const InputTextAreaAccomplishment = ({
  label,
  required = true,
  className = "focus:border-primary text-[12px]",
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <textarea
        className={
          meta.touched && meta.error ? `error-show ${className}` : className
        }
        {...field}
        {...props}
        autoComplete="off"
      ></textarea>
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};
