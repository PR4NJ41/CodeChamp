import React, { useState } from "react";
import { useEffect } from "react";
import "../Profile/homepage.css";
import Navbar from "../../Components/Navbar/navbar";
import { useGlobalContext } from "../../Components/Context/context";
import "./questionsPage.css";

//lkneafkjnkfjnkjnfkjanskfnkasnjfkndskfnjskdnfksdnfksnfksjndkfjsdkn
// import { IonContent, IonPage, IonList, IonItem, IonIcon } from "@ionic/react";

// import { bookmarkOutline, bookmark } from "ionicons/icons";

// const config = [
// 	{
// 		icon: bookmarkOutline,
// 		styledIcon: bookmark,
// 		type: "bookmark",
// 	},
// ];

// const ToggleIcon = ({ icon, color, styledIcon, handleClick }: any) => {
//   return (
//     <IonIcon icon={color ? styledIcon : icon} onClick={handleClick}></IonIcon>
//   );
// };

// const [bookColor, setBookColor] = useState(false);
//   return (
//     <IonPage>
//       <IonContent>

//         <IonList>
//           <IonItem lines="none">
//             {config.map((props, index) => (
//               <ToggleIcon
//                 style={{ padding: "10px" }}
//                 handleClick={() => {
//                   if(props.type === "bookmark") {
//                     setBookColor(!bookColor);
//                 }

//                 }}
//                 color={props.type === "like" ?likeColor : bookColor}
//                 {...props}
//               />
//             ))}

//           </IonItem>
//         </IonList>
//       </IonContent>
//     </IonPage>
//   );
// };
//lkneafkjnkfjnkjnfkjanskfnkasnjfkndskfnjskdnfksdnfksnfksjndkfjsdkn

const QuestionsPage = () => {
	const { questions, acceptedProblems, newQuestions, setNewQuestions, onLoading, setOnLoading } = useGlobalContext();

	const [currentpage, setCurrentpage, k] = useState(1);
	const recordPerPage = 50;
	const lastIndex = recordPerPage * currentpage;
	const firstIndex = lastIndex - recordPerPage;

	const records = newQuestions.slice(firstIndex, lastIndex);
	const nPages = Math.ceil(newQuestions.length / recordPerPage);

	const search = (event) => {
		const p = questions.filter((e) => e.name.toLowerCase().includes(event.target.value.toLowerCase()) || (e.rating.toString().includes(event.target.value.toString()) && e.rating.toString().length == event.target.value.toString().length));
		setNewQuestions(p);
	};
	useEffect(() => {
		if (questions.length == 0) {
			setOnLoading(true);
		}

		setTimeout(() => {
			setOnLoading(false);
		}, 500);
	}, []);

	return (
		<div className="main">
			{/*
			  {onLoading && <div className="loader" />} 
			*/}
			<Navbar />
			<div className="searchBox">
				<input className="newSearch" placeholder="Search Question" id="questionSearch" onChange={search}></input>
				<div className="search">
					<img src="search.svg"></img>
				</div>
			</div>

			<div className="grid">
				<table>
					<th className="tableRow">
						<td
							className="t1"
							style={{
								color: "#b2bde5",
								fontSize: "24px",
								fontWeight: "bolder",
								paddingLeft: "0px",
							}}
						>
							Contest
						</td>
						<td
							className="t2"
							style={{
								color: "#b2bde5",
								fontSize: "24px",
								fontWeight: "bolder",
							}}
						>
							Problem
						</td>
						<td
							className="t3"
							style={{
								color: "#b2bde5",
								fontSize: "24px",
								fontWeight: "bolder",
								paddingRight: "40px",
							}}
						>
							Rating
						</td>
						<td
							className="t4"
							style={{
								color: "#b2bde5",
								fontSize: "24px",
								fontWeight: "bolder",
							}}
						>
							Save
						</td>
						<td
							className="t4"
							style={{
								color: "#b2bde5",
								fontSize: "24px",
								fontWeight: "bolder",
							}}
						>
							Solved
						</td>
					</th>

					{records.map((post, index) => {
						const isAccepted = acceptedProblems.some((accepted) => accepted.contestId === post.contestId && accepted.index === post.index);
						return (
							<tr className="tableRow">
								<td className="t1">
									<a style={{ color: "tomato" }} href={`https://codeforces.com/problemset/problem/${post.contestId}/${post.index}`}>
										{post.contestId}
										{post.index}
									</a>
								</td>
								<td className="t2">
									<a style={{ color: "#c9d9ff" }} href={`https://codeforces.com/problemset/problem/${post.contestId}/${post.index}`}>
										{post.name}
									</a>
								</td>
								<td className="t3">{post.rating}</td>

								<td className="t4">
									{isAccepted ? (
										<div>
											<ion-icon name="bookmark" style={{ color: "#0277bd", fontSize: "22px" }} />
										</div>
									) : (
										<div class="book">
											<ion-icon
												class="one"
												name="bookmark"
												style={{ color: "#0277bd", fontSize: "22px" }}
												onClick={() => {
													alert("Bookmark Added");
												}}
											/>
											<ion-icon class="two" name="bookmark-outline" style={{ color: "#0277bd", fontSize: "22px" }} />
										</div>
									)}
								</td>
								<td className="t4">{isAccepted ? <div className="accepted">Accepted</div> : ""}</td>
							</tr>
						);
					})}
				</table>
			</div>
			<div className="navigation">
				<tr className="navBox">
					<a className="navBtn" href="#" onClick={firstPage}>
						{"<<"}
					</a>
					<a href="#" className="navBtn" onClick={prevPage}>
						{"<"}
					</a>
					<td className="navPgNo">{`${currentpage} of ${nPages}`}</td>
					<a href="#" className="navBtn" onClick={nextPage}>
						{">"}
					</a>
					<a href="#" onClick={lastPage} className="navBtn">
						{">>"}
					</a>
				</tr>
			</div>
		</div>
	);

	function nextPage() {
		if (currentpage !== nPages) {
			setCurrentpage(currentpage + 1);
		}
	}
	function prevPage() {
		if (currentpage !== 1) {
			setCurrentpage(currentpage - 1);
		}
	}
	function firstPage() {
		setCurrentpage(1);
	}
	function lastPage() {
		setCurrentpage(nPages);
	}
};

export default QuestionsPage;
