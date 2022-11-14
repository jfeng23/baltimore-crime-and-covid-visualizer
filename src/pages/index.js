import React from 'react';
import UMBCLOGO from "./UMBC-LOGO.png"

const Home = () => {

	return (
		<>
			<div style={{marginLeft: "auto", marginRight: "auto"}}>
				<img src={UMBCLOGO} alt='UMBC-LOGO' width={'30%'} style={{padding: '17% 35% 17% 35%'}}></img>
			</div>
		</>
	);
};

export default Home;
