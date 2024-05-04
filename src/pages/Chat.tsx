import React from 'react'
import './chat.css'

const Chat = () => {
  return (
    // <div classNameName="jumbotron m-0 p-0 bg-transparent">
    //   <div classNameName="row m-0 p-0 position-relative">
    //     <div classNameName="col-12 p-0 m-0 position-absolute" style={{ right: "0px" }}>
    //       <div classNameName="card border-0 rounded"
    //         style={{ boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.10), 0 6px 10px 0 rgba(0, 0, 0, 0.01)", overflow: "hidden", height: "100vh;" }}>

    //         {/* <div classNameName="card-header p-1 bg-light border border-top-0 border-left-0 border-right-0"
    //      style={{color: "rgba(96, 125, 139,1.0)"}}>



    // 		  <div classNameName="dropdown show">

    // 			  <a id="dropdownMenuLink" data-toggle="dropdown" classNameName="btn btn-sm float-right text-secondary" role="button"><h5><i classNameName="fa fa-ellipsis-h" title="Ayarlar!" aria-hidden="true"></i>&nbsp;</h5></a>

    // 			<div classNameName="dropdown-menu dropdown-menu-right border p-0" aria-labelledby="dropdownMenuLink">

    // 				<a classNameName="dropdown-item p-2 text-secondary" href="#"> <i classNameName="fa fa-user m-1" aria-hidden="true"></i> Profile </a>
    // 				<hr classNameName="my-1"></hr>
    // 				<a classNameName="dropdown-item p-2 text-secondary" href="#"> <i classNameName="fa fa-trash m-1" aria-hidden="true"></i> Delete </a>

    // 			</div>
    // 		  </div>

    // 	  </div> */}

    //         <div classNameName="card bg-sohbet border-0 m-0 p-0" style={{ height: "100vh" }}>
    //           <div id="sohbet" classNameName="card border-0 m-0 p-0 position-relative bg-transparent"
    //             style={{ overflowY: "auto", height: "100vh" }}>

    //             <div classNameName="balon1 p-2 m-0 position-relative" data-is="You - 3:20 pm">

    //               <a classNameName="float-right"> Hey there! What's up? </a>

    //             </div>

    //             <div classNameName="balon2 p-2 m-0 position-relative" data-is="Yusuf - 3:22 pm">

    //               <a classNameName="float-left sohbet2"> Checking out iOS7 you know.. </a>

    //             </div>

    //             <div classNameName="balon1 p-2 m-0 position-relative" data-is="You - 3:23 pm">

    //               <a classNameName="float-right"> Check out this bubble! </a>

    //             </div>

    //             <div classNameName="balon2 p-2 m-0 position-relative" data-is="Yusuf - 3:26 pm">

    //               <a classNameName="float-left sohbet2"> It's pretty cool! </a>

    //             </div>

    //             <div classNameName="balon1 p-2 m-0 position-relative" data-is="You - 3:28 pm">

    //               <a classNameName="float-right"> Yeah it's pure CSS & HTML </a>

    //             </div>

    //             <div classNameName="balon2 p-2 m-0 position-relative" data-is="Yusuf - 3:33 pm">

    //               <a classNameName="float-left sohbet2"> Wow that's impressive. But what's even more impressive is that this bubble is really high. </a>

    //             </div>

    //           </div>
    //         </div>

    //         <div classNameName="w-100 card-footer p-0 bg-light border border-bottom-0 border-left-0 border-right-0">

    //           <form classNameName="m-0 p-0" action="" method="POST" autoComplete='off'>

    //             <div classNameName="row m-0 p-0">
    //               <div classNameName="col-9 m-0 p-1">

    //                 <input id="text" classNameName="mw-100 border rounded form-control" type="text" name="text" title="Type a message..." placeholder="Type a message..." required />

    //               </div>
    //               <div classNameName="col-3 m-0 p-1">

    //                 <button classNameName="btn btn-outline-secondary rounded border w-100" title="Gönder!"
    //                   style={{ paddingRight: "16px" }}><i classNameName="fa fa-paper-plane" aria-hidden="true"></i></button>

    //               </div>
    //             </div>

    //           </form>

    //         </div>

    //       </div>
    //     </div>

    //   </div>

    // </div>

    <div className="container">
 
      <div className="msg-header">
        <div className="container1">
          <img src="user1.png" className="msgimg" />
          <div className="active">
            <p>User name</p>
          </div>
        </div>
      </div>

      <div className="chat-page">
        <div className="msg-inbox">
          <div className="chats">
       
            <div className="msg-page">
        

              <div className="received-chats">
                <div className="received-chats-img">
                  <img src="user2.png" />
                </div>
                <div className="received-msg">
                  <div className="received-msg-inbox">
                    <p>
                      Hi !! This is message from Riya . Lorem ipsum, dolor sit
                      amet consectetur adipisicing elit. Non quas nemo eum,
                      earum sunt, nobis similique quisquam eveniet pariatur
                      commodi modi voluptatibus iusto omnis harum illum iste
                      distinctio expedita illo!
                    </p>
                    <span className="time">18:06 PM | July 24</span>
                  </div>
                </div>
              </div>
       
              <div className="outgoing-chats">
                <div className="outgoing-chats-img">
                  <img src="user1.png" />
                </div>
                <div className="outgoing-msg">
                  <div className="outgoing-chats-msg">
                    <p className="multi-msg">
                      Hi riya , Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Illo nobis deleniti earum magni
                      recusandae assumenda.
                    </p>
                    <p className="multi-msg">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>

                    <span className="time">18:30 PM | July 24</span>
                  </div>
                </div>
              </div>
              <div className="received-chats">
                <div className="received-chats-img">
                  <img src="user2.png" />
                </div>
                <div className="received-msg">
                  <div className="received-msg-inbox">
                    <p className="single-msg">
                      Hi !! This is message from John Lewis. Lorem ipsum, dolor
                      sit amet consectetur adipisicing elit. iste distinctio
                      expedita illo!
                    </p>
                    <span className="time">18:31 PM | July 24</span>
                  </div>
                </div>
              </div>
              <div className="outgoing-chats">
                <div className="outgoing-chats-img">
                  <img src="user1.png" />
                </div>
                <div className="outgoing-msg">
                  <div className="outgoing-chats-msg">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Velit, sequi.
                    </p>

                    <span className="time">18:34 PM | July 24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="msg-bottom">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Write message..."
              />

              <span className="input-group-text send-icon">
                <i className="bi bi-send"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat