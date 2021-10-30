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
    borderLeft: "28px",
    borderColor: "#9d1717",
    minHeight: "100vh",
    fontSize: 20,
    paddingLeft: 20,
  },
  header: {
    // backgroundColor: "red",
    fontFamily: "Cabin",
    padding: 20,
    paddingTop: 40,
    fontWeight: 700,
  },
  body: {
    // backgroundColor: "yellow",
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
    fontFamily: "Cabin",
    fontWeight: 400,
  },
  nav: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 170,
    order: -1,
    paddingLeft: 20,
    fontSize: 10,
    fontFamily: "Abel",
  },
  img: {
    width: 160,
    paddingBottom: 10,
  },

  toc: {
    color: "red",
    display: "table",
  },
});

const Doc = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={{ color: "#9d1717", fontSize: 24 }}>
          {data.work.title}
        </Text>
        <Text style={{ color: "#9d1717", fontSize: 12 }}>
          {data.work.subtitle}
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.nav}>
          {data.work.supportingResources[0] && (
            <Image
              style={styles.img}
              src={data.work.supportingResources[0].url}
            />
          )}
          <Text style={{ fontSize: 8 }}>Thema</Text>
          <Text>{data.work.mainThemaCode}</Text>
          <Text style={{ fontSize: 8 }}>BISAC</Text>
          <Text>{data.work.mainBisacCode}</Text>
        </View>
        <View style={styles.main}>
          <Text>
            {ReactHtmlParser(data.work.marketingTexts[0].externalText)}
          </Text>
          <Text style={{ paddingTop: 14, fontSize: 8, fontWeight: "bold" }}>
            Table of contents
          </Text>
          <Text>
            {ReactHtmlParser(data.work.marketingTexts[1].externalText)}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
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
            placeholder="Enter Consonance work ID"
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

const App = () => <WorkAdvanceInfoSheet />;

export default App;
