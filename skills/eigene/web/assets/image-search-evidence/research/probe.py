#!/usr/bin/env python3
# Capture reproducible HTTP evidence without credentials.
import concurrent.futures, datetime, hashlib, json, pathlib, re, subprocess
ROOT=pathlib.Path(__file__).resolve().parent
vqd=re.search(r'vqd="([^"]+)"', (ROOT/'ddg-initial.html').read_text()).group(1)
PROBES=[
 ('google-images','https://www.googleapis.com/customsearch/v1?searchType=image&q=google%20logo&num=2',[]),
 ('bing-images','https://api.bing.microsoft.com/v7.0/images/search?q=google%20logo&count=2',[]),
 ('ddg-images',f'https://duckduckgo.com/i.js?l=de-de&o=json&q=dachdecker%20bei%20der%20arbeit&vqd={vqd}&f=,,,', ['-H','Referer: https://duckduckgo.com/']),
 ('serpapi-images','https://serpapi.com/search.json?engine=google_images&q=google%20logo&num=2',[]),
 ('serper-images','https://google.serper.dev/images',['-X','POST','-H','Content-Type: application/json','--data','{"q":"google logo","num":2}']),
 ('commons-images','https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=Google%20logo&gsrnamespace=6&gsrlimit=2&prop=imageinfo&iiprop=url%7Csize%7Cextmetadata&format=json',[]),
 ('brandfetch-cdn','https://cdn.brandfetch.io/google.com',[]),
 ('brandfetch-api','https://api.brandfetch.io/v2/brands/google.com',[]),
 ('logodev-cdn','https://img.logo.dev/google.com',[]),
 ('clearbit-cdn','https://logo.clearbit.com/google.com',[]),
 ('simpleicons-google','https://cdn.simpleicons.org/google',[]),
 ('simpleicons-stripe','https://cdn.simpleicons.org/stripe',[]),
 ('svgl-search','https://api.svgl.app?search=google',[]),
 ('svgl-svg','https://svgl.app/library/google.svg',[]),
 ('iconify-search','https://api.iconify.design/search?query=phone&limit=32',[]),
 ('iconify-svg','https://api.iconify.design/lucide/phone.svg',[]),
 ('unsplash-images','https://api.unsplash.com/search/photos?query=roofer&per_page=2',[]),
 ('pexels-images','https://api.pexels.com/v1/search?query=roofer&per_page=2',[]),
 ('google-docs','https://developers.google.com/custom-search/v1/overview',[]),
 ('google-image-docs','https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list',[]),
 ('bing-retirement','https://learn.microsoft.com/en-us/lifecycle/announcements/bing-search-api-retirement',[]),
 ('serpapi-pricing','https://serpapi.com/pricing',[]),
 ('serper-pricing','https://serper.dev/',[]),
 ('logodev-pricing','https://www.logo.dev/pricing',[]),
 ('logodev-docs','https://docs.logo.dev/logo-images/introduction',[]),
 ('brandfetch-pricing','https://brandfetch.com/pricing',[]),
 ('brandfetch-docs','https://docs.brandfetch.com/docs/logo-api',[]),
 ('clearbit-retirement','https://www.logo.dev/blog/clearbit-logo-api-shutdown',[]),
 ('simpleicons-docs','https://raw.githubusercontent.com/simple-icons/simple-icons/develop/README.md',[]),
 ('svgl-docs','https://svgl.app/api',[]),
 ('iconify-docs','https://iconify.design/docs/api/',[]),
 ('unsplash-docs','https://unsplash.com/documentation',[]),
 ('pexels-docs','https://www.pexels.com/api/documentation/',[]),
 ('pexels-limits','https://help.pexels.com/hc/en-us/articles/900005852323-What-are-the-API-rate-limits',[]),
 ('commons-docs','https://www.mediawiki.org/wiki/API:Imageinfo',[])
]
def probe(p):
 name,url,args=p
 cmd=['curl','-sS','-L','--max-time','40','--max-redirs','4','-A','Mozilla/5.0 (compatible; MAKE-Web-ImageSearch/1.0)',*args,'-D',str(ROOT/f'{name}.headers'),'-o',str(ROOT/f'{name}.body'),'-w','%{http_code}\n%{url_effective}\n%{content_type}',url]
 proc=subprocess.run(cmd,capture_output=True,text=True)
 parts=proc.stdout.split('\n');body=ROOT/f'{name}.body'
 result={'name':name,'tested_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'command':cmd,'http_status':int(parts[0] or 0),'effective_url':parts[1] if len(parts)>1 else '', 'content_type':parts[2] if len(parts)>2 else '', 'curl_exit':proc.returncode,'error':proc.stderr.strip(),'body':str(body.relative_to(ROOT.parent)),'sha256':hashlib.sha256(body.read_bytes()).hexdigest() if body.exists() else None}
 print(name,result['http_status'],result['curl_exit'],result['error'][:100],flush=True)
 return result
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
 results=list(pool.map(probe,PROBES))
(ROOT/'index.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
