import "./App.css";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

import React, { useState, useEffect, useRef } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import ReactHtmlParser from "react-html-parser";

Font.register({
  family: "Abel",
  src: "http://fonts.gstatic.com/s/abel/v6/RpUKfqNxoyNe_ka23bzQ2A.ttf",
});

Font.register({
  family: "Cabin",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/cabin/v10/XeuAFYo2xAPHxZGBbQtHhA.ttf",
      fontWeight: "400",
    },
    {
      src: "http://fonts.gstatic.com/s/cabin/v10/0tJ9k3DI5xC4GBgs1E_Jxw.ttf",
      fontWeight: "400",
      fontStyle: "italic",
    },
    {
      src: "http://fonts.gstatic.com/s/cabin/v10/HgsCQ-k3_Z_uQ86aFolNBg.ttf",
      fontWeight: "500",
    },
    {
      src: "http://fonts.gstatic.com/s/cabin/v10/50sjhrGE0njyO-7mGDhGP_esZW2xOQ-xsNqO47m55DA.ttf",
      fontWeight: "500",
      fontStyle: "italic",
    },
    {
      src: "http://fonts.gstatic.com/s/cabin/v10/eUDAvKhBtmTCkeVBsFk34A.ttf",
      fontWeight: "600",
    },
    {
      src: "http://fonts.gstatic.com/s/cabin/v10/sFQpQDBd3G2om0Nl5dD2CvesZW2xOQ-xsNqO47m55DA.ttf",
      fontWeight: "600",
      fontStyle: "italic",
    },
    {
      src: "http://fonts.gstatic.com/s/cabin/v10/4EKhProuY1hq_WCAomq9Dg.ttf",
      fontWeight: "700",
    },
    {
      src: "http://fonts.gstatic.com/s/cabin/v10/K83QKi8MOKLEqj6bgZ7LrfesZW2xOQ-xsNqO47m55DA.ttf",
      fontWeight: "700",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontSize: 20,
    paddingLeft: 0,
    backgroundColor: "#e9e9e9",
  },
  header: {
    backgroundColor: "white",
    fontFamily: "Cabin",
    padding: "20px 20px 0",
    fontWeight: 700,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #b8b8b8",
    marginBottom: 5,
  },
  body: {
    backgroundColor: "#fcfbfc",
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
  main: {
    flexDirection: "column",
    flex: 1,
    fontSize: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    fontFamily: "Cabin",
    fontWeight: 400,
  },
  headerblurb: {
    padding: "20px 200px 0 10px",
  },
  nav: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 170,
    order: -1,
    paddingLeft: 0,
    paddingTop: 20,
    fontSize: 10,
    fontFamily: "Abel",
    paddingRight: 20,
  },
  img: {
    width: 160,
    paddingBottom: 10,
  },

  toc: {
    color: "red",
    display: "table",
  },

  band: {
    height: "14px",
    width: "100%",
  },
  imgtop: {
    objectFit: "cover",
    backgroundColor: "#fcfbfc",
  },
  imgbottom: {
    objectFit: "cover",
    objectPosition: "2px",
    backgroundColor: "#fcfbfc",
  },
  cover: {
    right: "30px",
    paddingBottom: 20,
  },
  footer: {
    padding: "20px 0 20px 30px",
    fontSize: 10,
    color: "#373536",
  },
});
Font.registerHyphenationCallback((word) => [word]);
const Doc = ({ data }) => (
  <Document>
    {data.work && (
      <Page size="A4" style={styles.page}>
        {/* Band of cover at the top */}
        <View style={styles.band}>
          {data.work.supportingResources[0] && (
            <Image
              style={styles.imgtop}
              src={data.work.supportingResources[0].url}
            />
          )}
        </View>

        <View style={styles.header}>
          <View>
            <Text
              style={{
                fontSize: 10,
                transformOrigin: "40 30",
                transform: "rotate(-90deg)",
                backgroundColor: "#383332",
                color: "#e1dfdf",
                padding: "5px 10px",
              }}
            >
              Snowbooks
            </Text>
            <Text
              style={{
                color: "#373536",
                hyphens: "manual",
                fontSize: 32,
                padding: "0 200px 0 60px",
              }}
            >
              {data.work.title}
            </Text>
            <Text
              style={{
                color: "#5e5d5b",
                fontSize: 12,
                padding: "0 200px 0 60px",
              }}
            >
              {data.work.subtitle}
            </Text>
            <View style={styles.headerblurb}>
              <Text style={{ fontSize: 10 }}>
                {ReactHtmlParser(
                  data.work.marketingTexts[0].externalText.substring(0, 380)
                )}
                ...
              </Text>
            </View>
          </View>
          <View style={styles.cover}>
            {data.work.supportingResources[0] && (
              <Image
                style={styles.img}
                src={data.work.supportingResources[0].url}
              />
            )}
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.main}>
            <Text>
              {ReactHtmlParser(data.work.marketingTexts[0].externalText)}
            </Text>
            <Text style={{ paddingTop: 14, fontSize: 8, fontWeight: "bold" }}>
              About the book
            </Text>
            {data.work.marketingTexts[1] && (
              <Text>
                {ReactHtmlParser(data.work.marketingTexts[1].externalText)}
              </Text>
            )}
          </View>
          <View style={styles.nav}>
            <Text style={{ fontSize: 8 }}>Contributor</Text>
            {data.work.contributions.slice(0, 10).map((value, key) => {
              return (
                <View key={key}>
                  <Text>
                    {value.role} {value.contributor.name}
                  </Text>
                </View>
              );
            })}
            <Text style={{ fontSize: 8 }}>Thema</Text>
            <Text>{data.work.mainThemaCode}</Text>
            <Text style={{ fontSize: 8 }}>BISAC</Text>
            <Text>{data.work.mainBisacCode}</Text>
            <Text style={{ fontSize: 8 }}>ISBN</Text>
            <Text>{data.work.identifyingIsbn}</Text>
            {data.work.marketingTexts[2] && (
              <>
                <Text style={{ fontSize: 8 }}>Bio</Text>
                <Text>
                  {ReactHtmlParser(
                    data.work.marketingTexts[2].externalText.substring(0, 620)
                  )}
                </Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.band}>
          {data.work.supportingResources[0] && (
            <Image
              style={styles.imgbottom}
              src={data.work.supportingResources[0].url}
            />
          )}
        </View>
        <View style={styles.footer}>
          <Text>
            To place an order, please contact Inpress Sales
            orders@inpressbooks.co.uk • snowbooks.com • info@snowbooks.com{" "}
          </Text>
        </View>
        {/* <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        /> */}
      </Page>
    )}
  </Document>
);

const WorkAdvanceInfoSheet = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [work, setWork] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    fetch(`/.netlify/functions/node-fetch?id=${work}`)
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [work]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = inputRef.current;
    if (id && id.value) {
      setWork(id.value);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Work ID:
          <input
            id="workId"
            type="text"
            placeholder="Enter work ID e.g. 240976"
            name="Work ID"
            ref={inputRef}
          />{" "}
        </label>
        <input type="submit" value="Submit" />
      </form>
      {isLoading && <p>Loading...</p>}

      {!isLoading && (
        <PDFViewer width="1000" height="1000">
          <Doc data={data} />
        </PDFViewer>
      )}
    </>
  );
};

const Design = () => <WorkAdvanceInfoSheet />;

export default Design;
