export default function Footer() {
    return (
      <div>
        <footer className="fixed-bottom w-100 ">
          <div
            id="footer"
            className="d-flex justify-content-between container align-items-center p-3"
          >
            <div>
              <p className="p-0 m-0">
                Made with love by{" "}
                <b>
                  <i>Glory Praise, Sandra & Adeola</i>
                </b>
              </p>
            </div>
            {/* <div className="d-flex">
              <a href="http://github.com/emmaglorypraise" target="_">
                <i className="fab fa-github me-3" />
              </a>
              <a href="https://twitter.com/emmaglorypraise" target="_">
                <i className="fab fa-twitter me-3" />
              </a>
              <a
                href="https://www.linkedin.com/in/emmaglorypraise/"
                target="_"
              >
                <i className="fab fa-linkedin me-3" />
              </a>
              
            </div> */}
          </div>
        </footer>
      </div>
    );
  }
  