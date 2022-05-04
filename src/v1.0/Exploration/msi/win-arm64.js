"use strict";

const https = require("https");

const enableLogging = false;

const getURL = "https://statics.teams.cdn.office.net";
const getPartialBuild = "1.5.00.";

const getPlatform = "win-arm64";
const getPath = "production-windows-arm64";
const getFile = "Teams_windows_arm64.msi";

for (let getLatestBuild = 12409, getBuildLimit = getLatestBuild + 10; getLatestBuild <= getBuildLimit; getLatestBuild++) {
    https.get(getURL + "/" + getPath + "/" + getPartialBuild + getLatestBuild + "/" + getFile, (getResponse) => {
        if (getResponse.statusCode === 200) {
            const getDate = new Date(getResponse.headers["last-modified"]).toLocaleString("en-US", { dateStyle: "full", timeStyle: "short", timeZone: "PST" });
            const getMegabytes = Math.round(getResponse.headers["content-length"] / 1024 / 1024) + " MB";
            console.log(getPartialBuild + getLatestBuild + " (" + getPlatform + ") - published on " + getDate + " with " + getMegabytes + ": " + getURL + "/" + getPath + "/" + getPartialBuild + getLatestBuild + "/" + getFile);
        } else if (getResponse.statusCode === 404 && enableLogging) {
            console.log(getPartialBuild + getLatestBuild + " (" + getPlatform + "): Sorry, but an error has occurred as we cannot find this exploration build of Microsoft Teams. Please try again later.");
        }
    }).on("error", () => {
        if (enableLogging) {
            console.log(getPartialBuild + getLatestBuild + " (" + getPlatform + "): Sorry, but an error has occurred as we cannot connect to the host. Please try again later.");
        }
    });
}
