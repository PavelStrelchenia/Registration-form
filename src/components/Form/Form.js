import { useState } from "react";
import { validate, validateField } from "../../utils/validation";

import "./form.css";
import githubIcon from "../../assets/icons/github.svg";
import telegramIcon from "../../assets/icons/telegram.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";

const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const nextFormData = {
            ...formData,
            [name]: value,
        };

        setFormData(nextFormData);

        if (touched[name]) {
            const error = validateField(name, value, nextFormData);

            setErrors((prev) => {
                if (error) {
                    return {
                        ...prev,
                        [name]: error,
                    };
                }

                const newErrors = { ...prev };
                delete newErrors[name];

                return newErrors;
            });
        }

        if (name === "password" && touched.confirmPassword) {
            const error = validateField(
                "confirmPassword",
                nextFormData.confirmPassword,
                nextFormData,
            );

            setErrors((prev) => {
                if (error) {
                    return {
                        ...prev,
                        confirmPassword: error,
                    };
                }

                const newErrors = { ...prev };
                delete newErrors.confirmPassword;

                return newErrors;
            });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));

        const error = validateField(name, value, formData);

        setErrors((prev) => {
            if (error) {
                return {
                    ...prev,
                    [name]: error,
                };
            }

            const newErrors = { ...prev };
            delete newErrors[name];

            return newErrors;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate(formData);

        setErrors(validationErrors);

        setTouched({
            name: true,
            email: true,
            password: true,
            confirmPassword: true,
        });

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);
        setSuccess(false);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log("The form has been successfully submitted");

            setSuccess(true);
        } catch (error) {
            setSubmitError("Failed to submit the form");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <form onSubmit={handleSubmit} noValidate className="form">
                    <div className="form-header">
                        <h1>Create Account</h1>
                    </div>
                    <div className="form-field">
                        <label htmlFor="name">Name</label>

                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                touched.name && errors.name ? "input-error" : ""
                            }
                            required
                        />

                        {touched.name && errors.name && (
                            <p className="form-error">{errors.name}</p>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                touched.email && errors.email
                                    ? "input-error"
                                    : ""
                            }
                            required
                        />

                        {touched.email && errors.email && (
                            <p className="form-error">{errors.email}</p>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            minLength={6}
                            className={
                                touched.password && errors.password
                                    ? "input-error"
                                    : ""
                            }
                            required
                        />

                        {touched.password && errors.password && (
                            <p className="form-error">{errors.password}</p>
                        )}
                    </div>

                    <div className="form-field form-field-last">
                        <label htmlFor="confirmPassword">
                            Confirm password
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                touched.confirmPassword &&
                                errors.confirmPassword
                                    ? "input-error"
                                    : ""
                            }
                            required
                        />

                        {touched.confirmPassword && errors.confirmPassword && (
                            <p className="form-error">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="form-submit"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
                {submitError && (
                    <p className="submit-message submit-error">{submitError}</p>
                )}

                {success && (
                    <p className="submit-message submit-success">
                        Registration successfully completed!
                    </p>
                )}
                <div className="form-footer">
                    <div className="social-links">
                        <a
                            href="https://github.com/PavelStrelchenia"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={githubIcon} alt="GitHub" />
                            <span>GitHub</span>
                        </a>

                        <a
                            href="https://t.me/WebDevReactJS"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={telegramIcon} alt="Telegram" />
                            <span>Telegram</span>
                        </a>

                        <a
                            href="https://www.linkedin.com/in/%D0%BF%D0%B0%D1%88%D0%B0-%D1%81%D1%82%D1%80%D0%B5%D0%BB%D1%8C%D1%87%D0%B5%D0%BD%D1%8F-59979b223/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={linkedinIcon} alt="LinkedIn" />
                            <span>LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
