import Resume from '@/lib/resume.json'
import clsx from 'clsx'
import { useState } from 'react'

function CVPage() {
  const [isPrintMode] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countWords = (obj: any): number => {
    if (!obj) {
      return 0
    } else if (typeof obj === 'string') {
      return obj.split(' ').length
    } else if (typeof obj === 'object') {
      return Object.values(obj).reduce((acc: number, value) => {
        return acc + countWords(value)
      }, 0)
    } else if (Array.isArray(obj)) {
      return obj.reduce((acc, item) => {
        return acc + countWords(item)
      }, 0)
    }

    return 0
  }

  console.log(`Word count: ${countWords(Resume)}`)

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '8.5in',
      }}
    >
      <main className={clsx('space-y-6', !isPrintMode && 'p-8')}>
        <section className="flex flex-col items-center">
          <h1 className="font-bold text-xl font-serif mb-2">
            {Resume.personal_details.name}
          </h1>
          <p>{Resume.personal_details.title}</p>
          <div className="flex flex-wrap justify-center items-center space-x-2 text-gray-500">
            <p>{Resume.personal_details.contact.email}</p>
            <p>•</p>
            <a href={`https://${Resume.personal_details.contact.linkedin}`}>
              <p>{Resume.personal_details.contact.linkedin}</p>
            </a>
            <p>•</p>
            <a href={`https://${Resume.personal_details.contact.github}`}>
              <p>{Resume.personal_details.contact.github}</p>
            </a>
            <p>•</p>
            <a href={`https://${Resume.personal_details.contact.medium}`}>
              <p>{Resume.personal_details.contact.medium}</p>
            </a>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif text-center">Summary</h2>
          <hr />
          <p className="text-justify">{Resume.summary}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif text-center">Skills</h2>
          <hr />
          <div className="space-y-2">
            {Resume.skills.map((skill) => (
              <div className="flex flex-wrap space-x-1" key={skill.title}>
                <h3 className="text-gray-500">{skill.title}:</h3>
                {skill.items.map((item, idx) => (
                  <div
                    className="flex items-center space-x-1"
                    key={`${skill}-${item}`}
                  >
                    <p>{item}</p>
                    <p>{idx !== skill.items.length - 1 && '•'}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif text-center">Experience</h2>
          <hr />
          <div className="space-y-4">
            {Resume.experience.map((exp) => {
              if (exp.title === 'divider') {
                return <hr className="mx-auto w-1/2" />
              } else {
                return (
                  <div
                    className="space-y-2"
                    style={{
                      marginBottom: isPrintMode ? exp.margin : undefined,
                    }}
                    key={exp.company}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-500">{exp.company}</p>
                        <h3 className="font-medium">{exp.title}</h3>
                      </div>
                      <div>
                        {exp.start_date && (
                          <p className="text-gray-500">
                            {exp.start_date} - {exp.end_date || 'Present'}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>{exp.summary && <p>{exp.summary}</p>}</div>
                    <ul className="space-y-2">
                      {exp.highlights?.map((highlight) => (
                        <li
                          className="flex space-x-2 text-justify"
                          key={highlight}
                        >
                          <p>•</p>
                          <p key={highlight}>{highlight}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              }
            })}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif text-center">Personal Projects</h2>
          <hr />
          <div className="space-y-4">
            {Resume.projects.map((proj) => (
              <div className="space-y-1" key={proj.title}>
                <h3 className="font-medium">{proj.title}</h3>
                <p className="text-justify">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif text-center">Education</h2>
          <hr />
          {Resume.education.map((edu) => (
            <div key={edu.institution}>
              <p className="text-gray-500">{edu.institution}</p>
              <h3 className="font-medium">{edu.degree}</h3>
            </div>
          ))}
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif text-center">
            Courses and Certificates
          </h2>
          <hr />
          {Resume.certifications.map((certs) => (
            <div className="flex space-x-2" key={certs.title}>
              <h3>{certs.title}</h3>
              <p className="text-gray-500">{`— ${certs.institution}, ${certs.date}`}</p>
            </div>
          ))}
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif text-center">
            Interests and Hobbies
          </h2>
          <hr />
          <div className="grid grid-cols-3 gap-2">
            {Resume.interests.map((int) => (
              <div key={int.title}>
                <h3>{int.title}</h3>
                <p className="text-gray-700 text-sm">{int.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default CVPage
