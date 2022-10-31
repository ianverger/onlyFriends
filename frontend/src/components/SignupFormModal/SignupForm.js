import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { Redirect } from 'react-router-dom';
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [preFirstName, setPreFirstName] = useState("");
  const [preLastName, setPreLastName] = useState("");
  const [birthdayDay, setBirthdayDay] = useState("");
  const [birthdayMonth, setBirthdayMonth] = useState("");
  const [birthdayYear, setBirthdayYear] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState([]);

  let thisYear = new Date().getFullYear();
  let monthNum = new Date().getMonth();
  let thisDate = new Date().getDate();
  const Days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [monthIdx, setMonthIdx] = useState(monthNum);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (password === confirmPassword) {
    //   setErrors([]);
   
      let birthday = `${Months[birthdayMonth]} ${birthdayDay}, ${birthdayYear}`;
      let firstName = preFirstName[0].toUpperCase() + preFirstName.slice(1).toLowerCase();
      let lastName = preLastName[0].toUpperCase() + preLastName.slice(1).toLowerCase();

      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName, birthday, gender }))
        .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      })

    };
  //   return setErrors(['Confirm Password field must be the same as the Password field']);
  // };

  useEffect(() => {
    getDays();
  }, [])

  if (sessionUser) return <Redirect to="/HomePage" />

  const getDays = function () {
    let numDays = Days[monthIdx];
    let daysArr = [];

    for (let i = 1; i <= numDays; i++) {
      daysArr.push(i);
    }
    return daysArr;
  }

  const getYears = function () {
    let yearsArr = [];

    for (let i = 1940; i <= thisYear; i++) {
      yearsArr.push(i);
    }
    return yearsArr;
  }


  return (
    <div id="SignupForm">
      <h1>Sign Up</h1>
      <h4 id="h4">It's quick and easy.</h4>
      <hr id="hr" />
      <form id="form" onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
          <input
            type="text"
            className="inputs"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div id="names">
            <input
              type="text"
              className="inputs"
              placeholder="First Name"
              value={preFirstName}
              onChange={(e) => setPreFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              className="inputs"
              placeholder="Last Name"
              value={preLastName}
              onChange={(e) => setPreLastName(e.target.value)}
              required
            />
          </div>
          <input
            type="text"
            className="inputs"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="inputs"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="headers">Birthday</p>
          <div id="bday">
            <select name="month" className="bdayz" id="month" onChange={e => {
              setMonthIdx(e.target.value);
              setBirthdayMonth(e.target.value);
              }}>
              {Months.map((month, idx) => {
                return <option value={idx} selected={idx === monthNum ? true : false}>{month}</option>
              })}
            </select>
            <select name="day" className="bdayz" id="day" onChange={e => {setBirthdayDay(e.target.value)}}>
              {getDays().map((day, idx) => {
                return <option value={day} selected={idx === thisDate - 1 ? true : false}>{day}</option>
              })}
            </select>
            <select name="year" className="bdayz" id="year" onChange={e => {setBirthdayYear(e.target.value)}}>
              {getYears().map((year) => {
                return <option value={year} selected={thisYear}>{year}</option>
              })}
            </select>
          </div>
          <p className="headers">Gender</p>
          <div id="gender" onChange={(e) => setGender(e.target.value)}>
            <label className="genderz">Female
              <input type="radio" id="female" name="gender" value="female"/>
            </label>
            <label className="genderz">Male
              <input type="radio" id="male" name="gender" value="male"/>
            </label>
            <label className="genderz">Other
              <input type="radio" id="other" name="gender" value="other"/>
            </label>
          </div>
          <br></br>
        <button id="signup-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;