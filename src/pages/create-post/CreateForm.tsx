import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import {db} from "../../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import './createForm.css';
import { useNavigate } from 'react-router-dom';

interface CreateFormData {
    title: string,
    description: string
}

const CreateForm = () => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("Enter a description on theme with atleast 5 characters long").min(5).max(80)
    })

const { register, handleSubmit, formState: {errors} } = useForm<CreateFormData>({
    resolver: yupResolver(schema)
})

const postsRef = collection(db, "posts");

const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
        ...data,
        username: user?.displayName,
        userId: user?.uid
    });

    navigate('/');
}

  return (
    <div className='form-container'>
        <form className='form' onSubmit={handleSubmit(onCreatePost)}>
            <input className='title' placeholder='Title..' {...register("title")} />
            <p style={{ color: "red" }}>{errors.title?.message}</p>
            <textarea placeholder='Description..' {...register("description")} />
            <p style={{ color: "red" }}>{errors.description?.message}</p>
            <input className='btn' type="submit" />
        </form>
    </div>
  )
}

export default CreateForm;