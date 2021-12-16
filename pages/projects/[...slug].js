import React from 'react'
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import gql from 'graphql-tag';
import client from '../../services/apolloClient';

export default function ProjectPage({project}) {
    console.log(project);
    const cleanHTML = DOMPurify.sanitize(project.description.html);
    const src = project.coverImage.url;

    return (
        <div>
            <h1>{project.title}</h1>
            <Image loader={() => src} src={src} width={500} height={500}/>
            <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
        </div>
    )
}

export async function getStaticPaths() {
    const {data} = await client.query({
        query: gql`
        query{
          projects{
            slug
          }
        }
        `
    })
    const {projects} = data;
    const paths = projects.map((project) => ({
        params: {slug: [project.slug]}
    }))

    return {paths, fallback: false};
}

export async function getStaticProps({params}){
    const slug = params.slug[0];
    const {data} = await client.query({
        query: gql`
        query ProjectBySlug($slug: String!){
          projects (where: {slug : $slug}){
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
        `,
        variables: {slug}
      })
      const {projects} = data;
      const project = projects[0];

      return {
          props: {
            project
          }
      }
}