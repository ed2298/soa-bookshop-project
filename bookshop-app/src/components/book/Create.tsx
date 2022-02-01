import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useAuth0 } from '../../contexts/auth0-context';


function Create(): JSX.Element {

  let history = useHistory();
  const { user, getIdTokenClaims } = useAuth0();

  interface IValues {
    [key: string]: any;
  }

  const [user_email, setUserEmail] = useState<string>('');
  const [values, setValues] = useState<IValues>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email)
    }
  }, [user])

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title: values.title,
      author: values.author,
      price: values.price,
      old_price: values.old_price,
      rating: values.rating,
      image_url: values.image_url,
      user_email
    }

    const submitSuccess: boolean = await submitform(formData);
    setSubmitSuccess(submitSuccess);
    setValues({...values, formData});
    setLoading(false);
    setTimeout(() => {
      history.push('/');
    }, 1500);
  }

  const submitform = async (formData: {}) => {
    try {
      const accessToken = await getIdTokenClaims();
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/book`, {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          "Accept": "application/json",
          "authorization": `Bearer ${accessToken.__raw}`
        }),
        body: JSON.stringify(formData)
      });
      return response.ok;
    } catch (ex) {
      return false;
    }
  }

  const setFormValues = (formValues: IValues) => {
    setValues({...values, ...formValues})
  }

  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({ [e.currentTarget.name]: e.currentTarget.value })
  }

  return (
    <div>
    <div className={"col-md-12 form-wrapper"}>
      <h3 className="display-4"> Add a new Book </h3>

      {submitSuccess && (
        <div className="alert alert-info" role="alert">
          The form was successfully submitted!
                        </div>
      )}

      <form id={"create-book-form"} onSubmit={handleFormSubmission} noValidate={true}>
        <div className="form-group row align-items-center">
          <div className="col-1 "></div>
          <label htmlFor="title" className="col-2 text-left lead"> Title: </label>
          <input type="text" id="title" onChange={(e) => handleInputChanges(e)} name="title" className="form-control col-8" placeholder="Enter title" />
          <div className="col-1"></div>
        </div>

        <div className="form-group row align-items-center">
          <div className="col-1"></div>
          <label htmlFor="author" className="col-2 text-left lead"> Author: </label>
          <input type="text" id="author" onChange={(e) => handleInputChanges(e)} name="author" className="form-control col-8" placeholder="Enter Author" />
          <div className="col-1"></div>
        </div>

        <div className="form-group row align-items-center">
          <div className="col-1"></div>
          <label htmlFor="price" className="col-2 text-left lead"> Price: </label>
          <input type="text" id="price" onChange={(e) => handleInputChanges(e)} name="price" className="form-control col-8" placeholder="Enter Price" defaultValue="$" />
          <div className="col-1"></div>
        </div>

        <div className="form-group row align-items-center">
          <div className="col-1"></div>
          <label htmlFor="old_price" className="col-2 text-left lead"> Old Price: </label>
          <input type="text" id="old_price" onChange={(e) => handleInputChanges(e)} name="old_price" className="form-control col-8" placeholder="Enter Old Price" defaultValue="$" />
          <div className="col-1"></div>
        </div>

        <div className="form-group row align-items-center">
          <div className="col-1"></div>
          <label htmlFor="rating" className="col-2 text-left lead"> Rating: </label>
          <input type="number" id="rating" onChange={(e) => handleInputChanges(e)} name="rating" className="form-control col-8" placeholder="Enter Rating" min={1} max={5} step={0.1} />
          <div className="col-1"></div>
        </div>

        <div className="form-group row align-items-center">
          <div className="col-1"></div>
          <label htmlFor="image_url" className="col-2 text-left lead"> Image URL: </label>
          <input type="text" id="image_url" onChange={(e) => handleInputChanges(e)} name="image_url" className="form-control col-8" placeholder="Enter Image URL" />
          <div className="col-1"></div>
        </div>

        <div className="form-group row">
          <div className="col-1"></div>
          <button className="btn btn-primary btn-block col-10" type="submit">
            Save
          </button>
          {loading &&
            <span className="fa fa-circle-o-notch fa-spin" />
          }
          <div className="col-1"></div>
        </div>
      </form>
    </div>
  </div>
  );

}
export default withRouter(Create)
