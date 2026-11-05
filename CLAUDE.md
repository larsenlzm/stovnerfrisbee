# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Website for Stovner Frisbee (stovnerfrisbee.no). The project uses Docker Compose for local development and deployment.

## Working conventions

- Always clean up after yourself when a task is done: stop dev servers and background processes you started, close browsers, delete temporary/test files you created (e.g. in `.playwright-mcp/`), and delete local branches once they are merged.

## Visitor profiles

When asked to review a page or feature "from the perspective of our users" (or "our userbase"), use these profiles. Browse the site as each one with Playwright (desktop and phone width), judge whether they find what they came for, and report friction and gaps per profile.

1. **Newcomer**: lives in the Oslo area and wants to try disc golf. Needs: what disc golf is, where the course is, how to get there, what to bring, how to try it cheaply, who to ask.
2. **Regular player**: plays a lot of disc golf and wants the latest details and updates on the course. Needs: current course status, layout or hole changes, news, upcoming events, links to UDisc scores.
3. **Planner**: wonders whether the course is playable on any given day. Needs: a quick answer on conditions or closures (weather, events, maintenance, tournaments using the course), visible without digging.
4. **Club builder**: plays at Stovner often and wants to join the community and help build the club. Needs: how to become a member, volunteer or join working parties (dugnad), who to contact, club activities and values.
5. **Competitor**: wants to enter a tournament or the league. Needs: dates, formats, signup links, results, and what is open to whom.
6. **Parent or youth**: looks for junior membership or activities for a child. Needs: junior price, age suitability, equipment loan, safety, who to contact.
7. **Sponsor or local partner**: a business or municipal contact judging whether the club is serious. Needs: who the club is, size and activity, organisation details, a contact person.
8. **Visitor from outside Oslo**: travelling and looking for a course to play. Needs: location and directions, course basics, what is allowed for non-members, how to pay or sign up, in under a minute.

For every profile, note the first thing they would look for, whether they find it, how many clicks it takes, and what would make them leave.
