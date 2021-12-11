import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import client from '../services/apolloClient';
import gql from 'graphql-tag';
import DOMPurify from 'isomorphic-dompurify';

export default function Home({projects}) {
  console.log(projects);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>La Portfolio v1</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <ul>
          {
            projects.map((project, i) => 
              <li key={i}>
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description.html) }} />
                <Image loader={() => project.coverImage.url} src={project.coverImage.url} width={500} height={500}/>
              </li>
            )
          }
        </ul>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        © 2021 Designed & Developed by
        {" "}
        <Link
          className="flex items-center justify-center"
          href="https://github.com/ThemeQuest/la-portfolio-v1"
          target="_blank"
          rel="noopener noreferrer"
        >
         ThemeQuest
        </Link>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const {data} = await client.query({
    query: gql`
    query{
      projects{
        title
        description{
          html
        }
         slug
        coverImage {
          url
        }
      }
    }
    `
  })
  const {projects} = data;
  return {
    props: {
      projects
    }
  }
}