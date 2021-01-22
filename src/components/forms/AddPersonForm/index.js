import { forwardRef, useEffect, useImperativeHandle, useRef,useState } from "react";
import PropTypes from "prop-types";

import BasicInput from "components/inputs/BasicInput";
import SelectInput from "components/inputs/SelectInput";

import st from "./add-person-form.module.scss";

const AddPersonForm = forwardRef(({ onChange }, ref) => {
  //consts (custom fields)
  const assistant = "bff2c8b4ca9b3591be6f56b61108531ffcdb4a61";
  const groups = "b0cc020463afa8d79510c0f9c577b85163ce4a55";

  //consts (options)
  const labelOptions = [
    "Work",
    "Home",
    "Mobile",
    "Other"
  ]

  //refs
  const nameInputRef = useRef(null);
  const orgInputRef = useRef(null);
  const locationInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const emailInputRef = useRef(null);

  //state
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneLabel, setPhoneLabel] = useState("Work");
  const [email, setEmail] = useState("");
  const [emailLabel, setEmailLabel] = useState("Work");
  const [assistantValue, setAssistantValue] = useState("");
  const [groupsValue, setGroupsValue] = useState("");
  
  //hooks
  useImperativeHandle(ref, () => ({
    validate: () => {
      const validationArray = [
        nameInputRef.current.validate(),
        orgInputRef.current.validate(),
        locationInputRef.current.validate(),
        phoneInputRef.current.validate(),
        emailInputRef.current.validate(),
      ];
      return validationArray.reduce((sum, validity) => sum && validity, true);
    },
  }));

  useEffect(() => {
    // clean state on unmount
    return () => {
      setName("");
      setOrganization("");
      setLocation("");
      setPhone("");
      setPhoneLabel("Work");
      setEmail("");
      setEmailLabel("Work");
      setAssistantValue("");
      setGroupsValue("");
    }
  }, [])

  useEffect(() => {
    onChange({
      name, 
      organization: {
        name: organization,
        address: location
      },
      phone: [
        {
          label: phoneLabel,
          value: phone
        }
      ],
      email: [
        {
          label: emailLabel,
          value: email
        }
      ],
      [assistant]: assistantValue,
      [groups]: groupsValue
    })
  }, 
    [
      onChange,
      name, 
      organization,
      location, 
      phoneLabel, 
      phone, 
      emailLabel, 
      email, 
      assistantValue, 
      groupsValue
    ]
  )

  //input validator
  const generalValidator = (value) => {
    return value !== "";
  };

  //render
  return (
    <form className={st.form}>
      <BasicInput
        ref={nameInputRef} 
        className={st.nameInput} 
        label="name" 
        name="name" 
        value={name} 
        validator={generalValidator}
        onChange={setName} />
      <BasicInput 
        ref={orgInputRef} 
        className={st.organizationInput} 
        label="organization" 
        name="organization" 
        value={organization} 
        validator={generalValidator}
        onChange={setOrganization} />
      <BasicInput 
        ref={locationInputRef} 
        className={st.locationInput} 
        label="location" 
        name="location" 
        value={location} 
        validator={generalValidator}
        onChange={setLocation} />
      <BasicInput 
        ref={phoneInputRef} 
        className={st.phoneInput} 
        label="phone" 
        name="phone" 
        value={phone} 
        validator={generalValidator}
        onChange={setPhone} />
      <SelectInput 
        className={st.phoneLabelInput} 
        label="label" 
        name="phoneLabel"
        value={phoneLabel} 
        onChange={setPhoneLabel} 
        options={labelOptions} />
      <BasicInput 
        ref={emailInputRef} 
        className={st.emailInput} 
        label="email" 
        name="email" 
        value={email} 
        validator={generalValidator}
        onChange={setEmail} />
      <SelectInput 
        className={st.emailLabelInput} 
        label="label" 
        name="emailLabel"
        value={emailLabel} 
        onChange={setEmailLabel} 
        options={labelOptions} />
      <BasicInput 
        className={st.assistantInput} 
        label="assistant" 
        name="assistant" 
        value={assistantValue} 
        onChange={setAssistantValue} />
      <BasicInput 
        className={st.groupsInput} 
        label="groups" 
        name="groups" 
        value={groupsValue} 
        onChange={setGroupsValue} />
    </form>
  )
})

AddPersonForm.defaultProps = {
  onChange: () => {}
}

AddPersonForm.propTypes = {
  onChange: PropTypes.func
}

export default AddPersonForm;