import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

import CommonHero from "../components/CommonHero/CommonHero";
import { Button } from "../components/Subscribe/Subscribe";

import { FormEntryType } from "../types";

import styles from "./../styles/Contact.module.scss";
import PageSeo from "../layout/PageSeo";

const validate = (values: FormEntryType) => {
  const errors: { [key: string]: string } = {};

  if (!values.email) {
    errors.email = "Kindly enter a valid email";
  }

  if (!values.message) {
    errors.message = "A message is required";
  }

  return errors;
};

export default function Contact() {
  return (
    <PageSeo title="Contact Us">
      <div className={styles.Contact}>
        <CommonHero title="Contact Us" info="Get in touch with us" bg="/bg/contact-bg.webp" />
        <div className={styles.ContactContent}>
          <div className={styles.ContactContentInfo}>
            <h2>Risalatul Islamiyyat Organization of Nigeria</h2>
            <div className={styles.ContactContentInfoDetails}>
              <span className={styles.Icons}>
                <FiMapPin stroke="#94CC07" strokeWidth={2} size={25} />
              </span>
              <div>
                <span>Postal Address</span>
                <p>
                  P. O. Box 22873 U.I. Post Office Ibadan,
                  <br /> Oyo State, Nigeria.
                </p>
              </div>
            </div>
            <div className={styles.ContactContentInfoDetails}>
              <span className={styles.Icons}>
                <FiMail stroke="#FF9900" strokeWidth={2} size={25} />
              </span>
              <div>
                <span>Email Address</span>
                <p>info@rionnigeria.org</p>
              </div>
            </div>
            <div className={styles.ContactContentInfoDetails}>
              <span className={styles.Icons}>
                <FiPhone stroke="#039341" strokeWidth={2} size={25} />
              </span>
              <div>
                <span>Phone Number</span>
                <p>+234 (805) 593 6722, +234 (802) 887 6782</p>
              </div>
            </div>
          </div>
          <FormEntry />
        </div>
      </div>
    </PageSeo>
  );
}

function FormEntry() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    },
    validate,
    onSubmit: async (values) => {
      let data = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        subject: values.subject,
        message: values.message,
      };

      let req = await axios({
        url: `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`,
        method: "post",
        headers: {
          Accept: "application/json",
        },
        data,
      });
      console.log(req);
      if (req.status === 200) {
        setShowSuccessAlert(true);
        resetEntries();
      }
    },
  });

  const resetEntries = () => {
    formik.resetForm();
    setTimeout(() => setShowSuccessAlert(false), 5000);
  };

  return (
    <>
      <Alert hideAlert={!showSuccessAlert} />
      <form className={styles.ContactContentForm} onSubmit={formik.handleSubmit}>
        <h2>Send us a Message</h2>
        <div>
          <label htmlFor="name">Your Name</label>
          <input id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
          />
          {formik.touched.email && formik.errors.email && (
            <span className={styles.errorMessage}>{formik.errors.email}</span>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input id="phoneNumber" name="phoneNumber" onChange={formik.handleChange} value={formik.values.phoneNumber} />
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input id="subject" name="subject" onChange={formik.handleChange} value={formik.values.subject} />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            rows={4}
            minLength={20}
            required
          ></textarea>
          {formik.touched.message && formik.errors.message && (
            <span className={styles.errorMessage}>{formik.errors.message}</span>
          )}
        </div>
        <Button title="Submit" isDisabled={formik.isSubmitting} />
      </form>
    </>
  );
}

function Alert({ hideAlert = true }) {
  return (
    <div className={[styles.Alert, hideAlert ? styles.AlertHidden : styles.AlertVisible].join(" ")}>
      Message sent successfully
    </div>
  );
}
