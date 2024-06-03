import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EarthquakeContext from "../state/EarthquakeContext";
import { actions } from "../state/earthquake";
import VulkanikImg from '../assets/images/GempaVulkanik.png';
import TektonikImg from '../assets/images/GempaTektonik.png';
import ReruntuhanImg from '../assets/images/GempaReruntuhan.png';
import GempaImg from '../assets/images/Gempa.png';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardGroup,
  Row,
  Col,
} from "reactstrap";

function HomePage() {
  const [latestEarthquake, setLatestEarthquake] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useContext(EarthquakeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const cachedData = localStorage.getItem("earthquakes");
        if (cachedData) {
          const earthquakes = JSON.parse(cachedData);
          setLatestEarthquake(earthquakes[0]);
          setLoading(false);
        } else {
          const response = await axios.get(
            "https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json"
          );
          const earthquakes = response.data.Infogempa.gempa;
          setLatestEarthquake(earthquakes[0]);
          localStorage.setItem("earthquakes", JSON.stringify(earthquakes));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, []);

  const handleRowClick = (gempa) => {
    dispatch(actions.setSelectedEarthquake(gempa));
    navigate("/map");
  };

  return (
    <div style={{ backgroundColor: "#FAFAFA", color: "#1D242B" }}>
      <header style={{ textAlign: "center", padding: "20px 0" }}>
        <h1>SeismoSphere</h1>
        <p>Lacak Gempa Secara Real-Time dan Selalu Siaga!</p>
      </header>
      <main>
        <section>
          <Row>
            <Col sm="6">
              <Card body >
                <CardTitle tag="h5">Gempa</CardTitle>
                <CardImg
                  alt="Gempa"
                  src={GempaImg}
                  style={{ width: "40%", height: "auto", margin: "0 auto" }}
                />
                <CardText>
                  Gempa adalah getaran permukaan bumi akibat pelepasan energi
                  dari dalam bumi secara tiba-tiba.
                </CardText>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle tag="h5">Gempa Bumi Terkini</CardTitle>
                {loading ? (
                  <CardText>Loading...</CardText>
                ) : (
                  latestEarthquake && (
                    <>
                      <CardText
                        onClick={() => handleRowClick(latestEarthquake)}
                      >
                        <strong>Tanggal:</strong> {latestEarthquake.Tanggal}
                      </CardText>
                      <CardText>
                        <strong>Waktu:</strong> {latestEarthquake.Jam}
                      </CardText>
                      <CardText>
                        <strong>Magnitude:</strong> {latestEarthquake.Magnitude}
                      </CardText>
                      <CardText>
                        <strong>Kedalaman:</strong> {latestEarthquake.Kedalaman}
                      </CardText>
                      <CardText>
                        <strong>Wilayah:</strong> {latestEarthquake.Wilayah}
                      </CardText>
                    </>
                  )
                )}
              </Card>
            </Col>
          </Row>
        </section>

        <section style={{ padding: "20px 0", color: "#FAFAFA" }}>
          <Card className="my-2">
            <CardBody>
              <CardTitle tag="h5" align="center">
                Jenis Jenis Gempa
              </CardTitle>
              <CardGroup>
                <Card style={{ width: "18rem" }}>
                  <CardImg alt="Gempa Tektonik" src={TektonikImg} />
                  <CardBody>
                    <CardTitle tag="h5">Gempa Tektonik</CardTitle>
                    <CardText>
                      Gempa ini disebabkan oleh pergerakan lempeng tektonik di
                      kerak bumi. Ini adalah jenis gempa yang paling umum dan
                      sering kali paling merusak.
                    </CardText>
                  </CardBody>
                </Card>
                <Card style={{ width: "18rem" }}>
                  <CardImg alt="Gempa Vulkanik" src={VulkanikImg} />
                  <CardBody>
                    <CardTitle tag="h5">Gempa Vulkanik</CardTitle>
                    <CardText>
                      Gempa ini terjadi akibat aktivitas vulkanik, seperti
                      letusan gunung berapi atau pergerakan magma di dalam bumi.
                    </CardText>
                  </CardBody>
                </Card>
                <Card style={{ width: "18rem" }}>
                  <CardImg alt="Gempa Reruntuhan" src={ReruntuhanImg} />
                  <CardBody>
                    <CardTitle tag="h5">Gempa Reruntuhan</CardTitle>
                    <CardText>
                      Gempa ini disebabkan oleh runtuhan tanah atau batuan di
                      daerah karst atau tambang. Mereka biasanya lebih kecil dan
                      lokal.
                    </CardText>
                  </CardBody>
                </Card>
              </CardGroup>
            </CardBody>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
