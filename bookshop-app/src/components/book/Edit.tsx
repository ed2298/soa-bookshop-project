import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from '../../contexts/auth0-context';


function Edit(): JSX.Element {

  const { getIdTokenClaims } = useAuth0();

  let history = useHistory();
  let { bookId } = useParams();

  interface IValues {
    [key: string]: any;
  }

  const [book, setBook] = useState()
  const [values, setValues] = useState<IValues>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/book/${bookId}`);
      const json = await response.json();
      setBook(json)    
    }
    fetchData();    
  }, [bookId]);

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const submitSuccess: boolean = await submitForm();
    setSubmitSuccess(submitSuccess);
    setLoading(false);

    setTimeout(() => {
      history.push('/');
    }, 1500);
  }

  const submitForm = async (): Promise<boolean> => {
    try {
      const accessToken = await getIdTokenClaims();
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/book/${bookId}`, {
        method: "put",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          "authorization": `Bearer ${accessToken.__raw}`
        }),
        body: JSON.stringify(values)
      });
      return response.ok;      
    } catch(ex) {
      return false;
    }
  }

  const setFormValues = (formValues: IValues) => {
    setValues({...values, ...formValues})
  }

  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    setFormValues({ [e.currentTarget.id]: e.currentTarget.value })
  }

  return (
    <div className={'page-wrapper'}>
    {book &&
      <div className={"col-md-12 form-wrapper"}>
        <h3 className="display-4"> Edit This Book  </h3>

        {submitSuccess && (
          <div className="alert alert-info" role="alert">
            The book has been edited successfully!
                        </div>
        )}
        <form id={"create-book-form"} onSubmit={handleFormSubmission} noValidate={true}>
          <div className="form-group row align-items-center">
            <div className="col-1"></div>
            <label htmlFor="title" className="col-2 text-left lead"> Title: </label>
            <input type="text" id="title" defaultValue={book.title} onChange={(e) => handleInputChanges(e)} name="title" className="form-control col-8" placeholder="Enter title" />
            <div className="col-1"></div>
          </div>

          <div className="form-group row align-items-center">
            <div className="col-1"></div>
            <label htmlFor="author" className="col-2 text-left lead"> Author: </label>
            <input type="text" id="author" defaultValue={book.author} onChange={(e) => handleInputChanges(e)} name="author" className="form-control col-8" placeholder="Enter Author" />
            <div className="col-1"></div>
          </div>

          <div className="form-group row align-items-center">
            <div className="col-1"></div>
            <label htmlFor="price" className="col-2 text-left lead"> Price: </label>
            <input type="text" id="price" defaultValue={book.price} onChange={(e) => handleInputChanges(e)} name="price" className="form-control col-8" placeholder="Enter Price" />
            <div className="col-1"></div>
          </div>

          <div className="form-group row align-items-center">
            <div className="col-1"></div>
            <label htmlFor="old_price" className="col-2 text-left lead"> Old Price: </label>
            <input type="text" id="old_price" defaultValue={book.old_price} onChange={(e) => handleInputChanges(e)} name="old_price" className="form-control col-8" placeholder="Enter Old Price" />
            <div className="col-1"></div>
          </div>

          <div className="form-group row align-items-center">
            <div className="col-1"></div>
            <label htmlFor="rating" className="col-2 text-left lead"> Rating: </label>
            <input type="number" id="rating" defaultValue={book.rating} onChange={(e) => handleInputChanges(e)} name="rating" className="form-control col-8" placeholder="Enter Rating" min={1} max={5} step={0.1} />
            <div className="col-1"></div>
          </div>

          <div className="form-group row align-items-center">
            <div className="col-1"></div>
            <label htmlFor="image_url" className="col-2 text-left lead"> Image: </label>
            <input type="text" id="image_url" defaultValue={book.image_url} onChange={(e) => handleInputChanges(e)} name="image_url" className="form-control col-8" placeholder="Enter Image URL" />
            <div className="col-1"></div>
          </div>

          <div className="form-group row">
            <div className="col-1"></div>
            <button className="btn btn-primary btn-block col-10" type="submit">
              Save changes
            </button>
            {loading &&
              <span className="fa fa-circle-o-notch fa-spin" />
            }
            <div className="col-1"></div>
          </div>
        </form>
      </div>
    }
  </div>
  )
}

export default Edit;