import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ListMyCats = () => {
    const [cats, setCats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("miTokenJWT");

        if (!token) {
            // No se encontró el token, redirige al usuario a la página principal
            navigate("/");
            return;
        }

        const fetchCats = async () => {
            console.log('llego');
            try {
                const response = await fetch(process.env.BACKEND_URL + "/api/cats", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCats(data);
                } else {
                    // Si hay un error en la respuesta, redirige al usuario a la página principal
                    navigate("/");
                }
            } catch (error) {
                console.error("Error al obtener los gatos:", error);
            }
        };

        fetchCats();
    }, []);

    return (
        <div>
            <h2>Mis Gatos</h2>
            <div className="row">
                {cats.map((cat) => (
                    <div className="col-md-4 mb-4" key={cat.id}>
                        <div className="card">
                            <img src={cat.image_url} className="card-img-top" alt={cat.name} />
                            <div className="card-body">
                                <h5 className="card-title">{cat.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};