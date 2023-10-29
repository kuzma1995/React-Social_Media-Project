import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from 'firebase/firestore';
import { Post as IPost} from '../Main';
import { auth, db } from '../../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import './post.css';

interface Props {
    post: IPost;
}

interface Like {
    likeId: string,
    userId: string
}

const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[] | null>(null);


    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map(doc => ({ userId: doc.data().userId, likeId: doc.id })))
    }

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id});
            if (user) {
            setLikes(prev => 
                prev 
                ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
                : [{ userId: user?.uid, likeId: newDoc.id }]
            );
        }
        }    catch (err) {
            console.log(err)
        }
}

    const removeLike = async () => {
    try {
        const removeLikeQuery = query(
            likesRef, 
            where("postId", "==", post.id),
            where("userId", "==", user?.uid )
        );

        const removeLikeData = await getDocs(removeLikeQuery)
        const likeId = removeLikeData.docs[0].id;
        const likeToDelete = doc(db, "likes", likeId);
        await deleteDoc(likeToDelete);
        if (user) {
            setLikes(prev => prev && prev.filter((like) => like.likeId !== likeId));
            }
        } catch (err) {
        console.log(err)
    }
}

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, []);

  return (
    <div className='post-container'>
        <div className='post__title'>
            <h1>{post.title}</h1>
        </div>

        <div className='post__body'>
            <p>{post.description}</p>
        </div>

        <div className="post__footer">
            <p>@{post.username}</p>
            <button onClick={hasUserLiked ? removeLike : addLike}> { hasUserLiked ? <>&#128078;</> : <>&#128077;</> } </button>
            {likes && <p>Likes: {likes.length}</p>}
        </div>
    </div>
  )
}

export default Post;