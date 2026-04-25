I’ll make the gallery interactive so visitors can click any photo and see more context.

Plan:
1. Update the gallery photo data
   - Add a clear title, location/category where useful, and a longer description for each image.
   - Include specific details for the recent Gotu/Isiolo Vision Fund fieldwork and KCB Gender & Disability Inclusion workshop.

2. Add a clickable photo detail view
   - Make each gallery image behave like a clickable card/button.
   - Open a clean popup/modal with:
     - Larger version of the photo
     - Photo title
     - Caption
     - More detailed description
     - Optional context such as location, event, or impact area

3. Improve mobile usability
   - Ensure the popup works well on the current phone-sized layout.
   - Add accessible close behavior and keyboard-friendly controls.
   - Keep hover captions for desktop while making tap/click behavior obvious on mobile.

4. Verify the update
   - Run the project build after implementation to confirm the gallery changes compile successfully.

Technical details:
- I’ll update `src/routes/gallery.tsx`.
- I’ll reuse the existing dialog UI components from `src/components/ui/dialog.tsx` rather than adding new dependencies.
- No database changes are needed; this is a frontend portfolio enhancement.