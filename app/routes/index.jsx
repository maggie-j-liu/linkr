export default function Index() {
  return (
    <main className="px-8 py-16 max-w-5xl mx-auto">
      <h1 className="text-5xl text-center font-bold bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white w-max mx-auto px-3 rounded-md">
        linkr
      </h1>
      <p className="text-2xl text-center max-w-xl mx-auto">
        A serverless Discord bot as a link shortener, built with Remix and
        running on Netlify.
      </p>
      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold">A Simple Setup</h2>
          <p>
            Add the bot to your server using this link here:{" "}
            <a
              className="text-blue-500"
              target="_blank"
              rel="noreferrer"
              href="https://discord.com/api/oauth2/authorize?client_id=947578460145066024&scope=applications.commands"
            >
              https://discord.com/api/oauth2/authorize?client_id=947578460145066024&scope=applications.commands
            </a>
            !
          </p>
          <img
            src="/assets/invite.png"
            alt="Invite the Bot"
            className="w-full"
            width="3016px"
            height="1756px"
          />
        </section>
        <section>
          <h2 className="text-xl font-semibold">Quickly Shorten Links</h2>
          <p>
            Use the <code>/shorten</code> command to create a short link.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Fast Redirects</h2>
          <p>
            Visit the short link the bot creates to be redirected to the
            original url.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Easy Management</h2>
          <p>
            Use the <code>/info</code> command to see the number of clicks, as
            well as access buttons to edit the link, view the number of clicks
            and delete the link. Linkr will keep track of the number of times
            each link has been clicked, allowing you to have privacy-friendly
            analytics.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">View All Links</h2>
          <p>
            Want to find a list of the short links you've created? Use the{" "}
            <code>/list</code> command to see them.
          </p>
        </section>
      </div>
    </main>
  );
}
