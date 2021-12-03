import React from "react";
import { useForm } from "react-hook-form";
import SECRETS from "./secrets";



export default function Form() {
    const { register, handleSubmit } = useForm();

    return <form onSubmit={
        handleSubmit(data => {
            let url
            if (process.env.NODE_ENV === 'production') {
                url = `${SECRETS.ANTO_BACKEND_SERVER_API}query-pur-db?counties=${data.counties}`
            } else {
                url = `${SECRETS.ANTO_DEV_BACKEND_SERVER_API}query-pur-db?counties=${data.counties}`
            }
            fetch(url, {
                method: "GET",
                mode: "cors"
            })
                .then(response => {console.log("response", response.text())})
                .catch(error => {console.log("error", error)})
        })}>
        <label>Field  </label>
        <input name="Counties: " {...register('counties')} />
        <input type="submit" />
    </form>;
}