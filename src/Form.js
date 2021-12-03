import React from "react";
import { useForm } from "react-hook-form";
import SECRETS from "./secrets";

export default function Form() {
    const { register, handleSubmit } = useForm();

    return <form onSubmit={
        handleSubmit(data => {
            const url = `${SECRETS.ANTO_BACKEND_SERVER_API}/query-pur-db?counties=${data.counties}`
            // const url = `${SECRETS.ANTO_DEV_BACKEND_SERVER_API}test`
            fetch(url, {
                method: "GET",
                mode: "cors"
            })
                .then(rawResponse => {console.log("raw response", rawResponse)})
                .then(response => response.json())
                .then(response => {console.log("response", response)})
                .catch(error => {console.log("error", error)})
        })}>
        <label>Field  </label>
        <input name="Counties: " {...register('counties')} />
        <input type="submit" />
    </form>;
}