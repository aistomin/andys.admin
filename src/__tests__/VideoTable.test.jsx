/**
 * @jest-environment jsdom
 */
import VideoTable from "../VideoTable.jsx";
import {render, screen, waitFor} from "@testing-library/react";
import React from 'react';
import "@testing-library/jest-dom/extend-expect"
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
});

const spinnerId = "progress-spinner";

const tableId = "videos-table";

const errorMessageId = "error-message";

test("Loading videos. Successful scenario.", async () => {
    fetch.mockResponseOnce('{"content":[{"id":1,"title":"Matteo Carcassi - Prelude in E Minor // Andrej Istomin","description":"Matteo Carcassi(1792 – 1853): \\"Prelude in E Minor\\". Performed by Andrej Istomin.","url":"https://www.youtube.com/watch?v=FtJ69YrA3Ok","createdOn":"2017-08-20T00:00:00.000+00:00","publishedOn":"2017-08-20T00:00:00.000+00:00","tags":["music","guitar","classicalguitar","classicalmusic","carcassi"]},{"id":2,"title":"Klaus Schindler - Zeit für Träume // Andrej Istomin","description":"The photos in this video were taken by my wife(checkout her channel, by the way:  https://www.youtube.com/channel/UC810...) in Landkreis Dachau(mostly in Schwabhausen and Altomünster). The lovely place where I live.","url":"https://www.youtube.com/watch?v=lLe-HB1WLO4","createdOn":"2017-08-20T00:00:00.000+00:00","publishedOn":"2017-08-20T00:00:00.000+00:00","tags":["music","guitar","classicalguitar","germanmusic","zeitfuertraeume"]},{"id":3,"title":"Andrej Istomin - Jenny","description":"The melody composed and performed by Andrej Istomin except those telephone sounds.","url":"https://www.youtube.com/watch?v=j_Ve3uiVsaA","createdOn":"2017-08-21T00:00:00.000+00:00","publishedOn":"2017-08-21T00:00:00.000+00:00","tags":["music","guitar","police","hobbymusician"]},{"id":4,"title":"Mauro Giuliani - Sonatina op. 71 no. 1 // Andrej Istomin","description":"A little bit of an autumn mood :) Music piece is composed by Mauro Giuliani, called \\"Sonatina op71 n°1\\". The pictures in slide-show are the reproductions of different Russian painters.","url":"https://www.youtube.com/watch?v=DIEBQxqY1yU","createdOn":"2017-11-11T00:00:00.000+00:00","publishedOn":"2017-11-11T00:00:00.000+00:00","tags":["music","guitar","classicalguitar","giuliani"]},{"id":5,"title":"Blackmore\'s Night - Minstrel Hall // Andrej Istomin","description":"The piece is composed by Ritchie Blackmore.","url":"https://www.youtube.com/watch?v=iTVHH1vMIcI","createdOn":"2017-11-13T00:00:00.000+00:00","publishedOn":"2017-11-13T00:00:00.000+00:00","tags":["music","guitar","blackmore"]},{"id":6,"title":"Fernando Sor - Andante // Andrej Istomin","description":"This time I\'m playing \\"Andante\\" by Fernando Sor. It is the very first time when I try to create a real video instead of slide show which I did for my previous videos. I hope you like it :)","url":"https://www.youtube.com/watch?v=kbd7a7j0VOE","createdOn":"2017-12-15T00:00:00.000+00:00","publishedOn":"2017-12-15T00:00:00.000+00:00","tags":["music","guitar","fernandosor","classicalguitar"]},{"id":7,"title":"Greensleeves(English traditional) // Andrej Istomin","description":"Today I\'d like to show you my attempt to play instrumental version of the traditional English song \\"Greensleeves\\".","url":"https://www.youtube.com/watch?v=DDt7N5KxXrM","createdOn":"2019-05-30T00:00:00.000+00:00","publishedOn":"2019-05-30T00:00:00.000+00:00","tags":["music","guitar","fernandosor","classicalguitar"]},{"id":8,"title":"Ferdinando Carulli - Andantino // Andrej Istomin","description":"This summer is really hot here in Germany. I decided to create this small summer video where I\'m trying to play nice light piece called \\"Andantino\\" by Ferdinando Carulli (1770-1841).","url":"https://www.youtube.com/watch?v=Hd05dNHYqAw","createdOn":"2019-07-09T00:00:00.000+00:00","publishedOn":"2019-07-09T00:00:00.000+00:00","tags":["music","guitar","carulli","classicalguitar"]},{"id":9,"title":"Johann Pachelbel - Sarabande (Guitar + Recorder) // Andrej Istomin","description":"This summer is really hot here in Germany. I decided to create this small summer video where I\'m trying to play nice light piece called \\"Andantino\\" by Ferdinando Carulli (1770-1841).","url":"https://www.youtube.com/watch?v=hRvXB_gnR84","createdOn":"2020-06-13T00:00:00.000+00:00","publishedOn":"2020-06-13T00:00:00.000+00:00","tags":["music","guitar","pachelbel","classicalguitar","recorder"]},{"id":10,"title":"J. S. Bach - Bourrée // Andrej Istomin","description":"Thanks for watching this video. If you like it, please subscribe to my channel, comment the videos, \\"like\\" them and share with your friends.","url":"https://www.youtube.com/watch?v=AjQBAQ1jzwc","createdOn":"2021-04-09T00:00:00.000+00:00","publishedOn":"2021-04-09T00:00:00.000+00:00","tags":["music","guitar","bach","classicalguitar"]}]}');
    render(<VideoTable/>);
    const spinner = screen.getByTestId(spinnerId);
    expect(spinner).toBeInTheDocument();
    expect(screen.queryByTestId(tableId)).toBeNull();
    expect(screen.queryByTestId(errorMessageId)).toBeNull();
    const table = await waitFor(() => screen.getByTestId(tableId));
    expect(table).toBeInTheDocument();
    expect(screen.queryByTestId(spinnerId)).toBeNull();
    expect(screen.queryByTestId(errorMessageId)).toBeNull();
});

test("Loading videos. Failed scenario.", async () => {
    fetch.mockResponseOnce(request => {
        throw Error("Something went wrong!")
    });
    render(<VideoTable/>);
    const error = await waitFor(() => screen.getByTestId(errorMessageId));
    expect(error).toBeInTheDocument();
    expect(screen.queryByTestId(spinnerId)).toBeNull();
    expect(screen.queryByTestId(tableId)).toBeNull();
});
