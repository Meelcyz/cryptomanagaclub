import logo from "./assets/logo.svg";
import bannerGirl from "./assets/BannerGirl.svg";
import instagramIcon from "./assets/InstagramIcon.svg";
import facebookIcon from "./assets/FacebookIcon.svg";
import openSeaIcon from "./assets/OpenSeaIcon.svg";
import discordIcon from "./assets/DiscordIcon.svg";
import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import {
  notifyError,
  notifyInfo,
  notifySuccess,
  notifyWarning,
} from "./helper";
import { formatUnits } from "ethers/lib/utils";
import { useTotalSupply, useMaxSupply, useCost } from "./hooks";
import { useState } from "react";
import { address } from "./contracts";
import nftabi from "./contracts/NFT.json";

const nftInterface = new ethers.utils.Interface(nftabi);

function App() {
  const { account, activateBrowserWallet } = useEthers();
  const [amount, setAmount] = useState(1);

  const totalSupply = useTotalSupply();
  const maxSupply = useMaxSupply();
  const price = useCost();

  const formattedPrice = parseFloat(formatUnits(price.toString(), 18));

  const increase = () => {
    if (amount < 5) {
      setAmount(amount + 1);
    }
  };

  const decrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const onError = () => {
    notifyWarning("Wrong Network!", "Please Connect To Polygon Mainnet");
  };

  async function handleMint() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const txCost = Number(price) * amount;
      let nftcontract = new ethers.Contract(address, nftInterface, signer);
      let transaction = await nftcontract.mint(amount, {
        value: txCost.toString(),
      });
      notifyInfo("Please Wait", "Your request is being proceed");
      await transaction.wait();
      setAmount(1);
      notifySuccess("Congratulations !", "You have succesfully minted CMC");
    } catch (error) {
      notifyError("Oops !", "Something went wrong");
      setAmount(1);
      console.log(error);
    }
  }

  return (
    <div className="App">
      <header>
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-3">
              <div className="logo">
                <a href="#">
                  <img src={logo} />
                </a>
              </div>
            </div>

            <div className="col-9 text-end">
              <div className="main_menu">
                <div className="social_icons">
                  <a href="#">
                    <img src={instagramIcon} />
                  </a>
                  <a href="#">
                    <img src={facebookIcon} />
                  </a>
                  <a href="#">
                    <img src={discordIcon} />
                  </a>
                  <a href="#">
                    <img src={openSeaIcon} />
                  </a>
                </div>
                <button className="btn btn-primary">JOIN OUR DISCORD</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="main_banner">
        <div className="container">
          <div className="row">
            <div className="col-md-7"></div>
            <div className="col-md-5">
              <h1 className="cm_title">
                <span className="heading_1">Welcome</span>
                <span className="heading_2">to the</span>
                <span className="heading_3">Club</span>
              </h1>

              <p className="ps-5 mt-4">
                <b>A UNIQUE NFT.</b> JUST FOR YOU.
              </p>

              <div className="center_mobile">
                <p>
                  <b>
                    Lorem ipsum dolor sit amet, consectetur
                    <br />
                    adipiscing elit. In dictum, nunc et ultrices <br />
                    pellentesque, erat metus gravida enim, <br />
                    ac cursus dui risus vel massa.
                  </b>
                </p>

                <h1 className="numbers">
                  {totalSupply}/{maxSupply}
                </h1>

                <div className="cm_counts_wrap">
                  {account ? (
                    <>
                      <button
                        onClick={() => handleMint()}
                        className="btn btn-primary rounded-4 px-4"
                      >
                        MINT
                      </button>
                      <div className="cm_counts">
                        <button
                          onClick={() => decrease()}
                          className="btn btn-primary"
                        >
                          -
                        </button>
                        <span>
                          {amount} for {amount * formattedPrice} MATIC
                        </span>
                        <button
                          onClick={() => increase()}
                          className="btn btn-primary"
                        >
                          +
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => activateBrowserWallet(onError)}
                      className="btn btn-primary rounded-4 px-4"
                    >
                      CONNECT YOUR WALLET
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <img src={bannerGirl} className="banner_img" />
      </div>
    </div>
  );
}

export default App;
