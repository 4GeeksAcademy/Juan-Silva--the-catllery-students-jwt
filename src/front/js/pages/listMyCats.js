import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ListMyCats = () => {
    const [cats, setCats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("miTokenJWT");

        if (!token) {
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
        <div className="card mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={cat.image_url} className="img-fluid rounded-start" alt={cat.name} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{cat.name}</h5>
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    );
};

