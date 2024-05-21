import Layout from "@/components/Layout";
import Link from "next/link";
import { useState } from "react";
import styles from "../../../styles/Form.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import { converToImageUrl, generateUniqueKey } from "@/shared/helpers";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

export default function EditNews({sportNews}: any){
    const attributes = sportNews.attributes;
    const [values, setValues] = useState({
        name: attributes.name,
        detail: attributes.detail,
        time: attributes.time,
        date: attributes.date,
    });

    const [imagePreview, setImagePreview] = useState(
        attributes.image
    );
    
    const [showModal, setShowModal] = useState(false);

    const {name, detail, time, date} = values;

    const router = useRouter();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const emptyFieldCheck = Object.values(values).some((element) => element === "");
        
     
       
        if(emptyFieldCheck){
            toast.error("Please fill all Input Field");
        }
        try{
            const response = await axios.put(`${API_URL}/api/sports/${sportNews.id}`, {
                data: {
                    name: values.name,
                    detail: values.detail,
                    time: values.time,
                    date: values.date,
                }
            });
        }
        catch(error){
            console.log(error);
        }

       
    }

    const imageUploaded = async (e:any) => {
        const res = await fetch(`${API_URL}/api/sports/${sportNews.id}?populate=*`);
        const data = await res.json();
        setImagePreview(data.data.attributes.image);
        setShowModal(false);
    };

    const handleInputChange = (e: any) => {
        const{name, value} = e.target;
        setValues({...values, [name]: value})
    }

    return(
        <Layout title="Add News Sport News">
            <Link href="/news">GO Back</Link>
            <h2>Add Sport News</h2>
            <ToastContainer/>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                        name="name"
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input
                        name="date"
                        type="date"
                        id="date"
                        value={moment(date).format("yyy-MM-DD")}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input
                        name="time"
                        type="text"
                        id="time"
                        value={time}
                        onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                        <label htmlFor="name">Detail</label>
                        <textarea
                        name="detail"
                        id="detail"
                        value={detail}
                        onChange={handleInputChange}
                        />
                    </div>
                <input className="btn" type="submit" value="Edit News" />
            </form>
            {imagePreview ? (
                <Image src={converToImageUrl(imagePreview)} height={100} width={180} alt='#'/>
            ) : (
                <div>
                    <p>No Image Available</p>
                </div>
            )}
            <div>
                <button onClick={() => setShowModal(true)} className="btn-edit">
                    Update Image
                </button>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload
                    sportNewsId={sportNews.id}
                    imageUploaded={imageUploaded}
                />
            </Modal>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps<any> = async ({query: {id}}) => {
    try {
        const res = await fetch(`${API_URL}/api/sports/${id}?populate=*`);
        const data = await res.json();
        return {
            props: {
                sportNews: data.data,
            },
        };
    } catch (error) {
        console.error(id);
        return {
            props: {
                sportNews: null, 
            },
        };
    }
}

