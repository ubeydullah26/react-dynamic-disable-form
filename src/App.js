import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const user = {
  name: 'ubeydullah',
  city: 'Ankara',
};

export default function App() {
  const { register, handleSubmit } = useForm();

  const { register: registerCity, handleSubmit: handleSubmitCity } =
    useForm();

  const [active, setActive] = useState(false);
  const [city, setCity] = useState('');

  const checkActive = () => {
    setActive(user.city === city);
  };

  const formDisabled = (data) => {
    if (data) {
      setCity(data.city);
      const startTime = moment(data.start_time).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      const endTime = moment(data.start_time)
        .add(data.active_time, data.active_time_period)
        .format('YYYY-MM-DD HH:mm:ss');
      const startOverTime = moment(endTime)
        .add(data.repeat_time, data.repeat_time_period)
        .format('YYYY-MM-DD HH:mm:ss');

      if (startOverTime < moment().format('YYYY-MM-DD HH:mm:ss')) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
        console.log('start time');
      }

      checkActive();
      console.log(data);
      console.log('startTime', startTime);
      console.log('endTime', endTime);
      console.log('startOverTime', startOverTime);
    }
  };

  const activeCitySubmit = (data) => {
    formDisabled(data);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    checkActive();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <form onSubmit={handleSubmitCity(activeCitySubmit)}>
            <div>
              <label className="form-label">Start Time</label>
              <input
                {...registerCity('start_time')}
                className="form-control"
                type="datetime-local"
              />
            </div>
            <div>
              <label className="form-label">Repeat Time</label>
              <input
                {...registerCity('repeat_time')}
                className="form-control"
                type="text"
              />
            </div>
            <div>
              <label className="form-label">Repeat Time Period</label>
              <select
                {...registerCity('repeat_time_period')}
                className="form-select"
              >
                <option value="">Select</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
              </select>
            </div>
            <div>
              <label className="form-label">Active Time</label>
              <input
                {...registerCity('active_time')}
                className="form-control"
                type="text"
              />
            </div>
            <div>
              <label className="form-label">Active Time Period</label>
              <select
                {...registerCity('active_time_period')}
                className="form-select"
              >
                <option value="">Select</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
              </select>
            </div>
            <div>
              <label className="form-label">City</label>
              <select
                {...registerCity('city')}
                className="form-select"
              >
                <option value="">Select</option>
                <option value="Ankara">Ankara</option>
                <option value="London">London</option>
                <option value="Berlin">Berlin</option>
                <option value="New York">New York</option>
              </select>
            </div>
            <button className="btn btn-primary my-2" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="col-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="form-label">Name</label>
              <input
                {...register('name')}
                disabled={active}
                className="form-control"
                type="text"
              />
            </div>
            <div>
              <label className="form-label">City</label>
              <input
                {...register('city')}
                disabled={active}
                className="form-control"
                type="text"
              />
            </div>
            <button
              disabled={active}
              className="btn btn-primary my-2"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
