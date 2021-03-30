import Head from 'next/head'
import { promises as fs } from 'fs'
import path from 'path'
import Papa from 'papaparse'

export async function getStaticProps(){
  const filePath = path.join(process.cwd(), 'data/transactions.csv');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return {
    props: {
      rawFileContents: fileContents,
      transactions: Papa.parse(fileContents, {
      header: true,
      delimiter: ","
    }).data
    }
  }
}

export default function Home({transactions, rawFileContents}) {
  console.log(transactions)
  //console.log(rawFileContents)
  return (
    <div className="container">
      <Head>
        <title>Major Leageu Banking</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Roboto&family=Roboto+Mono:wght@700&display=swap" rel="stylesheet" />

      </Head>

      <main>
        <header>
          <h1>
            <span className="header-title-red">Major</span>
            <span className="header-title-blue">League</span>
            <span className="header-title-yellow">Banking</span>
            </h1>
        </header>
        <div className="transactions">
          {transactions.map(transaction => (
            <Transaction
            date={transaction.Date}
            amount={transaction.Amount}
            merchant={transaction.Description}
            key={`${transaction.Date}-${transaction.Amount}-${Math.random}`}/>
          ) )}
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding:0;
          align-items: center;
        }

        main {
          text-align: center;
          width:100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }


        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        h1{
          font-size:48px;
          display:flex;
          flex-direction: column;
          margin:20px 0;
        }

        .header-title-red{
          color:#e73427;
        }
        .header-title-blue{
          color:#1d539f;
        }
        .header-title-yellow{
          color:#f8b92a;
        }

        header{
          background-color:#333333;
          width:100%;
          position:sticky;
          top:0px;
        }

        .

      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Luckiest Guy', cursive;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

function Transaction({date, amount, merchant}){

  return(
    <>
    <div className="transaction">
      <div className="merchant">{merchant}</div>
      <div className="date">{date}</div>
      <div className="amount">{amount}</div>
    </div>

    <style jsx>{`
    
    .transaction{
        display:grid;
        grid-template-areas: "merchant amount"
                             "date amount";
        grid-template-columns:1fr 100px;
        background-color:#333333;
        color:#bbbbbb;
        font-family: 'Roboto', sans-serif;
        text-align:left;
    }
    .transaction::after{
      content:'';
      background:red;
      display:block;
      height:3px;
      width:180px;
      left: calc(50% - 90px/2);
      position:relative;

    }
    .merchant{
      grid-area:merchant;
      padding:6px 6px 6px 16px;
    }

    .date{
      grid-area:date;
      padding:6px 6px 6px 16px;
    }
    
    .amount{
      grid-area:amount;
      padding:6px 16px 6px 6px;
      /*display:flex;*/
      align-items:center;
      font-family:'Roboto Mono', monospace;
      text-align:right;
      justify-content:end;
    }

    `}</style>
    </>
  )
}