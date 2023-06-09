import table from '././img/table.png'
import onePng from '././img/1.png'
import twoPng from '././img/2.png'
import threePng from '././img/3.png'
import fourPng from '././img/4.png'
import fivePng from '././img/5.png'
import sixPng from '././img/6.png'
import sevenPng from '././img/7.png'
import eightPng from '././img/8.png'
import {RequestApi} from "./api/request.api";
import {useEffect, useState} from "react";
import {Modal, Typography} from 'antd'
import {PlacesApi} from "./api/places.api";


function BookPlace({userData}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [placeToBook, setPlaceToBook] = useState(0)
    const [bookedPlaces, setBookedPlaces] = useState([])

    const getBookedPlaces = async () => {
        const result = await PlacesApi.getBookedPlaces()
        setBookedPlaces(result.data.map((item) => item.place))
    }

    useEffect(() => {
        getBookedPlaces()
    }, [])
    return (
        <>
            <Modal
                title={''}
                // style={{ top: 20 }}
                open={isModalOpen}
                onCancel={() => {setIsModalOpen(false);}}
                destroyOnClose
                okText={'Yes'}
                cancelText={'No'}
                onOk={ async () => {
                    setIsModalOpen(false);
                    await PlacesApi.bookPlace(userData.email, placeToBook);
                    await getBookedPlaces()
                }
                }
            >
                <Typography>Book place #{placeToBook}?</Typography>
            </Modal>
            <div className="">
                <div className="row" >
                    <div className="col-xs-12" style={{width: '650px', height: '400px', background: 'white', position: "relative"}} >
                        <img src={table} style={{position: 'absolute', top: '44%', left: '37%', width: '25%'}}/>
                        <img src={onePng} onClick={() => {setPlaceToBook(1); setIsModalOpen(true)}} className={bookedPlaces.includes(1) ? 'locked' : 'place-img'} style={{position: 'absolute', top: '35%', left: '38%', width: '4%'}}/>
                        <img src={twoPng} onClick={() => {setPlaceToBook(2); setIsModalOpen(true)}} className={bookedPlaces.includes(2) ? 'locked' : 'place-img'} style={{position: 'absolute', top: '35%', left: '44%', width: '4%'}}/>
                        <img src={threePng} onClick={() => {setPlaceToBook(3); setIsModalOpen(true)}} className={bookedPlaces.includes(3) ? 'locked' : 'place-img'} style={{position: 'absolute', top: '35%', left: '50%', width: '4%'}}/>
                        <img src={fourPng} onClick={() => {setPlaceToBook(4); setIsModalOpen(true)}} className={bookedPlaces.includes(4) ? 'locked' : 'place-img'} style={{position: 'absolute', top: '35%', left: '56%', width: '4%'}}/>
                        <img src={fivePng} onClick={() => {setPlaceToBook(5); setIsModalOpen(true)}} className={bookedPlaces.includes(5) ? 'locked' : 'place-img'} style={{position: 'absolute', top: '59%', left: '38%', width: '4%'}}/>
                        <img src={sixPng} onClick={() => {setPlaceToBook(6); setIsModalOpen(true)}} className={bookedPlaces.includes(6) ? 'locked' : 'place-img'} style={{position: 'absolute', top: '59%', left: '44%', width: '4%'}}/>
                        <img src={sevenPng} onClick={() => {setPlaceToBook(7); setIsModalOpen(true)}} className={bookedPlaces.includes(7) ? 'locked' : 'place-img'} style={{position: 'absolute', top: '59%', left: '50%', width: '4%'}}/>
                        <img src={eightPng} onClick={() => {setPlaceToBook(8); setIsModalOpen(true)}} className={bookedPlaces.includes(8) ? 'locked' : 'place-img'} style={{position: 'absolute', top: '59%', left: '56%', width: '4%'}}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookPlace;
