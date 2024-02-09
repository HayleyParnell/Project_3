-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "fire_nrt" (
    "latitude" float(53)   NOT NULL,
    "longitude" float(53)   NOT NULL,
    "brightness" float(53)   NOT NULL,
    "scan" float(53)   NOT NULL,
    "track" float(53)   NOT NULL,
    "acq_date" varchar(100)   NOT NULL,
    "acq_time" int  NOT NULL,
    "satellite" varchar(100)   NOT NULL,
    "instrument" varchar(100)   NOT NULL,
    "confidence" int  NOT NULL,
    "version" float(53)   NOT NULL,
    "bright_t31" float(53)   NOT NULL,
    "frp" float(53)   NOT NULL,
    "daynight" varchar(100)   NOT NULL,
    CONSTRAINT "pk_fire_nrt" PRIMARY KEY (
        "latitude","longitude"
     )
);

CREATE TABLE "fire_archive" (
    "latitude" float(53)   NOT NULL,
    "longitude" float(53)   NOT NULL,
    "brightness" float(53)   NOT NULL,
    "scan" float(53)   NOT NULL,
    "track" float(53)   NOT NULL,
    "acq_date" varchar(100)   NOT NULL,
    "acq_time" int  NOT NULL,
    "satellite" varchar(100)   NOT NULL,
    "instrument" varchar(100)   NOT NULL,
    "confidence" int  NOT NULL,
    "version" float(53)   NOT NULL,
    "bright_t31" float(53)   NOT NULL,
    "frp" float(53)   NOT NULL,
    "daynight" varchar(100)   NOT NULL,
    "type" int  NOT NULL,
    CONSTRAINT "pk_fire_archive" PRIMARY KEY (
        "latitude","longitude"
     )
);


