My main focus was to update the search to filter on the server side. With potentially hundreds of thousands of advocates, those would have to be filtered in the db prior to being paginated and sent to the client.

I added some light styling to the page, with extra focus on the "Specialties", since I figured that would be a very important aspect in choosing an advocate. Additionally, I added the functionality to click on the specialty and have it added as the filter term to further enable that search "specialty first".

I spent an extra 30 minutes or so debugging the jsonb filter. Having not worked too much with Drizzle or jsonb columns, there was a little bit of trial-and-error with the filtering. I don't think casting it to `::text` is as performant as the jsonb querying directly, and given more time I would update that code.

Key things I would add or change:

- Debounce on the searching field, so that every keystroke would not hit the server.
- Filtering and sorting per column, instead of all fields being searched through the text box. Additional filters like "within 25 miles from my location" instead of only searching by city itself. Also years of experience should be a greater-than filter, not a text search.
- Generally updating the markup to use more components. I refactored a few to not be bare HTML, but generally they should be updated to be more flexible. For exampled, having a static amount of columns instead of rendering them more dynamically, etc.
- The jsonb filtering to avoid casting to text. If filtering by specialty is more central to the app, it may be better to migrate these values away from a json field and into their own table where they could be joined to the advocate rows in a many-to-many relation, but possibly the perfmance on the json column is good and needs no further optimization.
