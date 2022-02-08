import "../styles/About.css";
import AboutCard from "./AboutCard";
import eleni from "../images/creators/eleni.jpg";
import hung from "../images/creators/hung.jpg";
import kat from "../images/creators/kat.jpg";

function About() {
  return (
    <div className="about-container">
      <div className="about">
        <div className="about-card">
          <h1>About My Carbon Footprint</h1>
          <br />
          <p>
            My Carbon Footprint was created by Eleni, Kat, and Hung to give you
            a fun and easy way to get a snapshot of your personal carbon
            footprint. The app takes a look at some of the most common carbon
            emitting activities and provides you the ability to fill in your
            personal details and receive an estimate of carbon emissions based
            on data provided by the <strong>Carbon Interface REST API</strong>.
            The data that powers the API is sourced from governments,
            non-profits, and leading researchers around the world including the{" "}
            <strong>EPA</strong>
            <strong>GHG Protocol</strong> and
            <strong>Environment Canada</strong>. The app is designed to create
            awareness by powering carbon measurement to combat climate change.
          </p>
        </div>
        <div className="creators-card">
          <AboutCard
            name="Katherine Roll"
            info="Studying Math in her undergraduate degree along with a bit of computer science on the side, Katherine has always had a long term goal to go into the software engineering field. However, after graduating, she took a 3 year pause on that goal to pursue another passion — working with livestock and horses on ranches in Colorado. Now, back in New England, she took the opportunity to attend the Flatiron School’s software engineering bootcamp where she is currently a student."
            image={kat}
            linkedin="https://www.linkedin.com/in/katherine-roll-82b157205/"
            github="https://github.com/katroll"
          />
          <AboutCard
            name="Eleni Papanicolas"
            info="For the past 16 years Eleni called various restaurants home. When the pandemic hit, and restaurants closed down, she had an unusual opportunity to use her newfound free time to learn something new. She started taking coding courses and was totally hooked on creating cool stuff from scratch. It was then that she decided that this was something she wanted to pursue full time. Eleni is currently a software engineering student at Flatiron School and she likes building things that are accessible, inclusive, responsive and dynamic."
            image={eleni}
            github="https://github.com/e-papanicolas"
            linkedin="https://www.linkedin.com/in/elenipapanicolas/"
          />
          <AboutCard
            name="Hung Le"
            info="Graduating with a degree in Fine Arts, Hung's passion had always been to create. Soon after graduating, he left the traditional creative field to live and work in Tokyo, Japan. For the past 11 years, he has continued his studies from Japan seeking opportunities to challenge himself and continue his education. With his passion to create still lingering, and the growing creative tech field continuing to grow, Hung joined FlatIron School's full-time software engineer bootcamp to pursue work as a full-stack software developer."
            image={hung}
            github="https://github.com/The-Orange-Dot"
            linkedin="https://www.linkedin.com/in/hung-le-fullstack/"
          />
        </div>
        <div className="more-info-card">
          <h1>Do you want to learn more about climate change?</h1>
          <br />
          <div>
            <h3>
              Here are some links with more information on climate change &
              carbon emissions
            </h3>
            <br />
            <ul className="link-list">
              <li>
                <a href="https://www.epa.gov/ghgemissions/global-greenhouse-gas-emissions-data">
                  EPA Greenhouse Gas Emissions
                </a>
              </li>
              <li>
                <a href="https://climate.nasa.gov/evidence/">
                  NASA Climate Evidence
                </a>
              </li>
              <li>
                <a href="https://www.climatelinks.org/blog">
                  Climate Links Global Knowledge Portal
                </a>
              </li>
              <li>
                <a href="https://www.climate.gov/">
                  NOAA Science & Information for a Climate-Smart Nation
                </a>
              </li>
              <li>
                <a href="https://www.climatecentral.org/">
                  Climate Central: An independent organiztion of leading
                  scientists
                </a>
              </li>
              <li>
                <a href="https://www.nytimes.com/section/climate">
                  New York Times Climate & Environment
                </a>
              </li>
              <li>
                <a href="https://www.aspeninstitute.org/topics/climate/">
                  Aspen Institute's Climate Change Section
                </a>
              </li>
              <li>
                <a href="https://www.greenpeace.org/usa/blog/">
                  GreenPeace The Environmentalist
                </a>
              </li>
              <li>
                <a href="https://www.brookings.edu/blog/planetpolicy/">
                  Planet Policy
                </a>
              </li>
              <li>
                <a href="https://wwf.panda.org/">World Wildlife Fund</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
